import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { toast } from "react-toastify";

export const ModalDevolver = ({ openModal1, setOpenModal1 }) => {
  const [idEmpleadoDetails, setIdEmpleadoDetails] = useState({});
  const [bovedaDetails, setBovedaDetails] = useState({});
  const [amount, setAmount] = useState("");

  // Login, user context
  const { user } = useAuth();

  // Función para traer todos los empleados.
  const fetchEmpleados = async () => {
    try {
      const response = await fetch("http://localhost:3000/get_users");
      if (response.ok) {
        const userData = await response.json();
        const empleadoPrincipal = userData.find(
          (users) => users.id_rol === 4
        );
        setIdEmpleadoDetails(empleadoPrincipal || {});
      } else {
        console.error("Error fetching user info:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Función para traer información de la bóveda.
  const fetchBoveda = async () => {
    try {
      const response = await fetch("http://localhost:3000/get_boveda");
      if (response.ok) {
        const data = await response.json();
        setBovedaDetails(data);
      } else {
        console.error("Error fetching data info:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data info:", error);
    }
  };

  // Función para devolver saldo a la bóveda y registrar sus respectivos movimientos
  const devolverBalance = async () => {
    const idEmpleado = idEmpleadoDetails.id_empleado;
    const saldoEmpleado = parseFloat(idEmpleadoDetails.saldo) || 0;
    const saldoBoveda = parseFloat(bovedaDetails.saldo_boveda) || 0;
    const amountToReturn = parseFloat(amount);

    // Validar monto ingresado
    if (isNaN(amountToReturn) || amountToReturn <= 0) {
      return toast.error("Error: El monto debe ser un número positivo mayor que cero.");
    }
    if (amountToReturn > saldoEmpleado) {
      return toast.error(
        "Error: El monto a devolver es mayor al saldo disponible del empleado."
      );
    }

    const newBalanceBoveda = saldoBoveda + amountToReturn;

    try {
      // Actualizar el saldo del cajero principal
      const responseCajero = await fetch(
        `http://localhost:3000/balance_request/${idEmpleado}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nuevoSaldo: saldoEmpleado - amountToReturn,
            saldoSolicitado: 0,
            newStatus: "Activo",
          }),
        }
      );

      if (!responseCajero.ok) {
        throw new Error("Error al actualizar el saldo del cajero.");
      }

      // Actualizar el saldo de la bóveda y registrar el movimiento
      const entradaBoveda = await fetch(
        `http://localhost:3000/entrada_boveda/${idEmpleado}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            entradaSaldo: amountToReturn,
            nuevoSaldo: newBalanceBoveda,
          }),
        }
      );

      if (!entradaBoveda.ok) {
        throw new Error("Error al actualizar el saldo de la bóveda.");
      }

      toast.success("Saldo devuelto y actualizado correctamente.");
      setOpenModal1(false); // Cerrar el modal

      setTimeout(() => {
        window.location = "/DashBoardMenu";
      }, 1500);
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Error al devolver el saldo.");
    }
  };

  useEffect(() => {
    fetchEmpleados();
    fetchBoveda();
  }, [user]);

  return (
    <>
      {openModal1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg bg-white shadow-sm w-full max-w-md">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex items-center justify-between">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Devolver a bóveda
                </h3>

                <button
                  type="button"
                  onClick={() => setOpenModal1(false)}
                  className="text-gray-400 bg-transparent transition hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <p className="text-sm text-gray-600">
                Ingresa el monto que deseas devolver a la bóveda.
              </p>
            </div>
            <div className="px-6 space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm text-gray-600 font-normal leading-none"
                  htmlFor="amount"
                >
                  Monto a devolver
                </label>
                <input
                  className="flex h-10 w-full rounded-md border-gray-400 bg-white px-3 py-2 text-sm placeholder-gray-500 focus:border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus-visible:outline-none"
                  id="amount"
                  placeholder="Ingresa el monto"
                  min="0"
                  step="1000"
                  type="number"
                  onChange={(event) => setAmount(event.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center p-6">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-white text-sm font-medium transition-colors bg-emerald-600 hover:bg-emerald-700 h-10 px-6 py-2 ml-auto"
                onClick={devolverBalance}
              >
                Devolver
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
