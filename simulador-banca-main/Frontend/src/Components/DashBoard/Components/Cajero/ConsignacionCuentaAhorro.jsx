import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../context/AuthContext";

const ConsgnacionCuentaAhorro = ({
  openConsignacion,
  setOpenConsignacion,
  modalData,
  setModalData,
}) => {
  const { user } = useAuth();

  const [idEmpleadoDetails, setIdEmpleadoDetails] = useState("");
  const [amount, setAmount] = useState("");

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

  const handleConsignar = async (data) => {
    const { id_detalle, saldo } = data;

    const id_empleado = idEmpleadoDetails.id_empleado;
    const saldo_empleado = idEmpleadoDetails.saldo;

    const newBalanceClient = parseFloat(amount) + parseFloat(saldo);
    const newBalanceEmploye = parseFloat(amount) + parseFloat(saldo_empleado);

    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error("No puedes consignar saldos menores o iguales a cero");
    } else {
      try {
        // Actualizar el saldo en la base de datos del cliente
        const responseClient = await fetch(
          `http://localhost:3000/update_balance/${id_detalle}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nuevoSaldo: newBalanceClient,
            }),
          }
        );

        if (!responseClient.ok) {
          throw new Error("Network response was not ok");
        }

        // Cambiar el estado del cliente a "Autorizado"
        const responseStatus = await fetch(
          `http://localhost:3000/client_status/${id_detalle}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nuevoEstado: "Autorizado",
            }),
          }
        );

        if (!responseStatus.ok) {
          throw new Error("Network response was not ok");
        }

        const responseEmploye = await fetch(
          `http://localhost:3000/balance_request/${id_empleado}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nuevoSaldo: newBalanceEmploye,
              newStatus: "Activo",
              saldoSolicitado: 0,
            }),
          }
        );

        if (!responseEmploye.ok) {
          throw new Error("Network response was not ok");
        }

        // Registrar movimiento
        const responseMovimiento = await fetch(
          `http://localhost:3000/post_movimiento`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id_detalle,
              saldo: amount,
              idEmpleado: id_empleado,
              tipoMovimiento: 1,
            }),
          }
        );

        if (!responseMovimiento.ok) {
          throw new Error("Network response was not ok");
        }

        toast.success("Consignación exitosa");
        setTimeout(() => {
          // Redirige a la página '/DashBoardMenu' después de procesar la respuesta
          window.location = "/DashBoardMenu";
        }, 1500);
      } catch (error) {
        console.error("Error general:", error);
      }
    }
  };

  const closeModal = () => {
    setOpenConsignacion(false);
    setModalData(null);
    setAmount("");
  };

  useEffect(() => {
    fetchEmpleadoId();
  }, []);

  return (
    <>
      {openConsignacion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg bg-white shadow-sm w-full max-w-md">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex items-center justify-between">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Consignar
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent transition hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => closeModal()}
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
            </div>
            <div className="px-6 space-y-4">
              <div className="flex justify-between flex-col w-full gap-y-2">
                <div className="space-y-2 w-full md:w-auto">
                  <label
                    className="text-sm text-gray-600 font-normal leading-none"
                    htmlFor="accountNumber"
                  >
                    Número de cuenta de ahorro
                  </label>
                  <input
                    id="accountNumber"
                    name="accountNumber"
                    type="number"
                    placeholder="Número de cuenta"
                    value={modalData?.num_cuenta || ""}
                    readOnly
                    className="flex h-10 w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-md placeholder-gray-500 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40"
                  />
                </div>

                <div className="space-y-2 w-full md:w-auto">
                  <label
                    className="text-sm text-gray-600 font-normal leading-none"
                    htmlFor="accountOwner"
                  >
                    Nombre del dueño de la cuenta
                  </label>
                  <input
                    id="accountOwner"
                    type="text"
                    placeholder="Nombre del dueño"
                    value={`${modalData?.nombre || ""} ${
                      modalData?.p_apellido || ""
                    } ${modalData?.s_apellido || ""}`}
                    readOnly
                    className="flex h-10 w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-md placeholder-gray-500 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm text-gray-600 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="saldo"
                  >
                    Saldo a consignar
                  </label>
                  <input
                    id="saldo"
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="Ingrese saldo a consignar"
                    value={amount || ""}
                    onChange={(event) => setAmount(event.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-sm placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end p-4 px-4 gap-2">
              <button
                onClick={() => handleConsignar(modalData)}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-white text-sm font-medium transition-colors bg-emerald-600 hover:bg-emerald-700 h-10 px-6 py-2 ml-auto"
              >
                Consignar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsgnacionCuentaAhorro;
