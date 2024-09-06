import React, { useState } from "react";
import { toast } from "react-toastify";
import {useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";

const Consignar = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountOwner, setAccountOwner] = useState("");
  const [amount, setAmount] = useState("");
  const [dataUser, setDataUser] = useState({});
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [idEmpleadoDetails, setIdEmpleadoDetails] = useState("");
  const [empleadoDetails, setEmpleadoDetails] = useState("");

  
  //Login, user context
  const { user } = useAuth();

    // Funcion para traer un empleado por id.
    const fetchEmpleadoId = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/get_users/${user.id_empleado}`
          );
          if (response.ok) {
            const userData = await response.json();
            setIdEmpleadoDetails(userData);
          } else {
            console.error("Error fetching user info:", response.status);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };

      useEffect(() => {
        const interval = setInterval(() => {
          fetchEmpleadoId();
        }, 5000);
    
        return () => clearInterval(interval);
      }, [user]);
    
  const handleAccountNumberChange = (event) => {
    const value = event.target.value;
    setAccountNumber(value);
    setIsFormDisabled(value.trim() === "");
  };

  const handleConsultClick = async () => {
    setIsLoading(true);
    try {
      const accountNumberInt = parseInt(accountNumber, 10);
      const response = await fetch(`http://localhost:3000/get_account/${accountNumberInt}`);
      
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      if (data) {
        const { primernombre, primerapellido, segundoapellido } = data;
        const ownerName = `${primernombre} ${primerapellido} ${segundoapellido}`;
        setAccountOwner(ownerName);
        setDataUser(data);
        setIsFormDisabled(false);
      } else {
        toast.error("No se encontraron datos para el número de cuenta proporcionado.");
      }
    } catch (error) {
      console.error("Error al consultar la base de datos:", error);
      toast.error("Error: Número de cuenta no encontrado.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConsign = async () => {
    const id = dataUser.id_detalle;
    const { saldo, estado } = dataUser;
  
    const idEmpleado = idEmpleadoDetails.id_empleado;
    const saldoEmpleado = idEmpleadoDetails.saldo;
  
    if (!idEmpleado || !saldoEmpleado) {
      toast.error("Error: No se encontraron detalles del empleado.");
      return;
    }
  
    if (estado === "Denegado") {
      toast.error("Error: Esta cuenta ha sido rechazada por un Director.");
      return;
    } else if (estado === "Pendiente") {
      toast.error("Error: Esta cuenta no ha sido autorizada por un Director.");
      return;
    } else if (parseFloat(amount) <= 0) {
      toast.error("Error: El saldo a consignar no puede ser 0 o menor a 0.");
      return;
    } else if (parseFloat(amount) > saldoEmpleado) {
      toast.error("Error: No tienes saldo suficiente para esta consignación.");
      return;
    }
  
    try {
      const newBalanceClient = parseFloat(amount) + parseFloat(saldo);
      const newBalanceEmployee = parseFloat(saldoEmpleado) + parseFloat(amount);
  
      const responseClient = await fetch(`http://localhost:3000/update_balance/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nuevoSaldo: newBalanceClient }),
      });
  
      if (!responseClient.ok) {
        const errorData = await responseClient.json();
        throw new Error(`Error al actualizar el saldo del cliente: ${errorData.message}`);
      }
  
      const responseEmployee = await fetch(`http://localhost:3000/balance_request/${idEmpleado}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nuevoSaldo: newBalanceEmployee,
          newStatus: "Activo",
          saldoSolicitado: 0,
        }),
      });
  
      if (!responseEmployee.ok) {
        const errorData = await responseEmployee.json();
        throw new Error(`Error al actualizar el saldo del empleado: ${errorData.message}`);
      }
  
      toast.success("Saldo consignado correctamente.");
      setTimeout(() => {
        window.location = "/DashBoardMenu";
      }, 1500);
    } catch (error) {
      console.error("Error al consignar:", error);
      toast.error(error.message || "Error al realizar la consignación.");
    }
  };
  
  return (
    <section className="container p-4 mx-auto" style={{ minHeight: "87vh" }}>
    <div className="flex justify-center items-center flex-col p-6">
      <h1 className="font-semibold text-2xl mb-4">Consignacion a cuentas de clientes</h1>
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="accountNumber" className="font-medium text-gray-700">Número de cuenta de ahorro:</label>
          <input
            id="accountNumber"
            type="number"
            placeholder="Número de cuenta"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
          <button
            onClick={handleConsultClick}
            disabled={isLoading}
            className={`mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Cargando..." : "Consultar"}
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="accountOwner" className="font-medium text-gray-700">Nombre del dueño de la cuenta:</label>
          <input
            id="accountOwner"
            type="text"
            placeholder="Nombre del dueño"
            value={accountOwner}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="font-medium text-gray-700">Monto a consignar:</label>
          <input
            id="amount"
            type="number"
            placeholder="Monto a consignar"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
            required
          />
        </div>
        <div>
          <button
            onClick={handleConsign}
            disabled={isFormDisabled}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Consignar;
