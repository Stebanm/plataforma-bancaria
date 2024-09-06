import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { toast } from "react-toastify";

export const ModalRetirar = ({ openModal, setOpenModal }) => {
  const [idEmpleadoDetails, setIdEmpleadoDetails] = useState("");
  const [bovedaDetails, setBovedaDetails] = useState("");
  const [amount, setAmount] = useState("");

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
      console.error("Error fetching data info:", response.status);
    }
  };

  // Función para retirar saldo de la boveda y registrar sus respectivos movimientos
  const retirarBalance = async () => {
    const { id_empleado, saldo } = idEmpleadoDetails;
    const saldoBoveda = bovedaDetails.saldo_boveda;

    // Verificar que el monto no esté vacío, sea mayor a cero y no sea superior al saldo de la bóveda
    if (!amount || parseFloat(amount) <= 0) {
      return toast.error("Error: El monto no debe ser menor o igual a cero.");
    } else if (parseFloat(amount) > saldoBoveda) {
      return toast.error(
        "Error: El saldo enviado es mayor al saldo total en bóveda."
      );
    }

    const newBalanceBoveda = parseFloat(saldoBoveda) - parseFloat(amount);
    const newBalanceEmpleado = parseFloat(amount) + parseFloat(saldo);

    if (saldoBoveda > 0) {
      try {
        const salidaBoveda = await fetch(
          `http://localhost:3000/salida_boveda/${id_empleado}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nuevoSaldo: newBalanceBoveda,
              salidaSaldo: amount,
            }),
          }
        );

        if (!salidaBoveda.ok) {
          throw new Error(
            "Network response was not ok al actualizar el saldo del cajero"
          );
        }

        const responseCajero = await fetch(
          `http://localhost:3000/balance_request/${id_empleado}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              newStatus: "Activo",
              saldoSolicitado: 0,
              nuevoSaldo: newBalanceEmpleado,
            }),
          }
        );

        if (!responseCajero.ok) {
          throw new Error(
            "Network response was not ok al actualizar el saldo del cajero"
          );
        }

        toast.success("Monto retirado de bóveda correctamente.");

        setTimeout(() => {
          // Actualiza localmente el estado del cliente según sea necesario
          // Puedes utilizar la función setDatauser para actualizar el estado local
          // Ejemplo: setDatauser(prevData => [...prevData, data.updatedClient]);
          // alert('Autorización exitosa')
          // Redirige a la página '/DashBoardMenu' después de procesar la respuesta
          window.location = "/DashBoardMenu";
        }, 1500);
      } catch (error) {
        return toast.error("Error al retirar monto de la bóveda.");
      }
    } else {
      return toast.error("Sin saldo en la bóveda.");
    }

    setOpenModal(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEmpleadoId();
      fetchBoveda();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg bg-white shadow-sm w-full max-w-md">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex items-center justify-between">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Retirar de la bóveda
                </h3>

                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="text-gray-400 bg-transparent transition hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
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
                Ingresa el monto que deseas retirar de la bóveda.
              </p>
            </div>
            <div className="px-6 space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm text-gray-600 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Monto a retirar
                </label>
                <input
                  className="flex h-10 w-full rounded-md border-gray-400 bg-white px-3 py-2 text-sm placeholder-gray-500 focus:border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
                onClick={retirarBalance}
              >
                Retirar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
