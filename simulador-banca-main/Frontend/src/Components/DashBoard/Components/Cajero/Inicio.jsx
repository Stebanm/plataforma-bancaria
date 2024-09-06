import "react-toastify/dist/ReactToastify.css";
import React from "react";
import bank from "../../../../assets/Img/UsoVario/bank-cajero.png";

import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../context/AuthContext";
import Transfers from "../CajeroPrincipal/Transfers";

export const Inicio = () => {
  //General Status
  const [idEmpleadoDetails, setIdEmpleadoDetails] = useState("");
  const [empleadoDetails, setEmpleadoDetails] = useState("");

  //Disable Modales
  const [amount, setAmount] = useState("");

  // Abrir Modal

  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);

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

  // funcion para traer todos los empleados.
  const fetchEmpleados = async () => {
    try {
      const response = await fetch("http://localhost:3000/get_users");
      if (response.ok) {
        const data = await response.json();
        setEmpleadoDetails(data);
      } else {
        console.error("Error fetching user info:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEmpleados();
      fetchEmpleadoId();
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  // Actualiza estado al momento de solicitar saldo
  const handleSolicitarSaldo = async () => {
    const idEmpleado = idEmpleadoDetails.id_empleado;

    try {
      const response = await fetch(
        `http://localhost:3000/balance_request/${idEmpleado}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newStatus: "Solicitud",
            saldoSolicitado: amount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.success(data.message);

      setTimeout(() => {
        window.location = "/DashBoardMenu";
      }, 1500);
    } catch (error) {
      console.error("Error al solicitar el saldo:", error);
      toast.error("Error al solicitar el saldo.");
    }
  };

  // Cancelar la solicitud de saldo.
  const handleCancelarSolicitud = async () => {
    const idEmpleado = idEmpleadoDetails.id_empleado;

    try {
      const response = await fetch(
        `http://localhost:3000/balance_request/${idEmpleado}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newStatus: "Activo",
            saldoSolicitado: 0,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.success(data.message);

      setTimeout(() => {
        window.location = "/DashBoardMenu";
      }, 1500);
    } catch (error) {
      console.error("Error al cancelar la solicitud:", error);
      toast.error("Error al cancelar la solicitud.");
    }
  };

  // Funcion para devolver saldo total del cajero al cajero principal
  const handleDevolverSaldo = async () => {
    // Filtra el empleado con rol de cajero principal
    const filterEmpleadoPrincipal = empleadoDetails.filter(
      (users) => users.id_rol === 4
    );

    const idEmpleado = idEmpleadoDetails.id_empleado;
    const saldoEmpleado = parseFloat(idEmpleadoDetails.saldo);
    const idPrincipal = filterEmpleadoPrincipal[0].id_empleado;
    const saldoPrincipal = parseFloat(filterEmpleadoPrincipal[0].saldo);

    // Convertir el monto ingresado a un número flotante
    const amountToReturn = parseFloat(amount);

    // Validaciones
    if (isNaN(amountToReturn) || amountToReturn <= 0) {
      return toast.error("Por favor, ingrese un monto válido.");
    }

    if (amountToReturn > saldoEmpleado) {
      return toast.error(
        "No tienes suficiente saldo para devolver esa cantidad."
      );
    }

    const newSaldoEmpleado = saldoEmpleado - amountToReturn;
    const newSaldoPrincipal = saldoPrincipal + amountToReturn;

    try {
      // Actualiza el saldo del cajero
      const responseCajero = await fetch(
        `http://localhost:3000/balance_request/${idEmpleado}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newStatus: "Activo",
            nuevoSaldo: newSaldoEmpleado,
            saldoSolicitado: 0,
          }),
        }
      );

      if (!responseCajero.ok) {
        throw new Error(
          "Network response was not ok al actualizar el saldo del cajero"
        );
      }

      // Actualiza el saldo del cajero principal (bóveda)
      const responsePrincipal = await fetch(
        `http://localhost:3000/balance_request/${idPrincipal}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newStatus: "Activo",
            nuevoSaldo: newSaldoPrincipal,
            saldoSolicitado: 0,
          }),
        }
      );

      if (!responsePrincipal.ok) {
        throw new Error(
          "Network response was not ok al actualizar el saldo del cajero principal"
        );
      }

      // Registrar el movimiento en el historial
      const responseMovimiento = await fetch(
        `http://localhost:3000/post_devolver/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idEmpleado: idEmpleado,
            saldo: amountToReturn,
            tipoMovimiento: 5,
            empleadoConsing: idPrincipal,
          }),
        }
      );

      if (!responseMovimiento.ok) {
        throw new Error(
          "Network response was not ok al registrar el movimiento"
        );
      }

      toast.success("Saldo devuelto y actualizado correctamente.");

      setTimeout(() => {
        window.location = "/DashBoardMenu";
      }, 1500);
    } catch (error) {
      console.error("Error al devolver el saldo:", error);
      toast.error("Error al devolver el saldo.");
    }
  };

  // Función para formatear el costo a miles sin decimales.
  const formatSaldo = (saldo) => {
    // Crea una instancia de Intl.NumberFormat con la configuración regional "es-CO" (Colombia)
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

    // Formatea el costo usando la configuración especificada.
    return formatter.format(saldo);
  };

  return (
    <>
      {
        <div
          className="flex justify-start items-center flex-col text-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="w-full flex overflow-hidden border-gray-200 dark:bg-gray-800 flex-col sm:flex sm:items-center sm:justify-between">
            <div className="w-full mx-auto">
              <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between  bg-DarkSlate px-4 py-12 rounded">
                  <div className="flex flex-col items-center justify-center gap-y-2 h-24 ">
                    <div className="flex items-center justify-center">
                      <p className="font-regular text-2xl text-white dark:text-gray-200 ">
                        Saldo total
                      </p>
                    </div>
                    <div className="flex jutify-center items-center gap-x-2">
                      <p className="font-semibold text-3xl text-white dark:text-gray-300">
                        {formatSaldo(idEmpleadoDetails.saldo)}
                      </p>
                    </div>
                  </div>

                  <div className="   grid gap-x-4 gap-y-4 mt-4 sm:flex sm:items-start sm:justify-between ">
                    <button
                      className="flex justify-center items-center gap-x-2 px-3 py-2 rounded-md text-white backdrop-blur-sm hover:backdrop-blur-lg bg-white/30 shadow"
                      onClick={() => setOpenModal3(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.4}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                        />
                      </svg>

                      <p>Entregar saldo</p>
                    </button>
                    <Modal
                      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                      show={openModal3}
                      size="md"
                      onClose={() => setOpenModal3(false)}
                      popup
                    >
                      <Modal.Header>
                        <span className="text-xl py-2 pl-4 pr-3 font-medium text-gray-900 dark:text-white">
                          Entrega de Saldo
                        </span>
                      </Modal.Header>
                      <Modal.Body className="px-5 pt-2 pb-5">
                        <div className="space-y-6">
                          <div>
                            <label
                              htmlFor="amount"
                              className="font-medium text-gray-700 dark:text-white"
                            >
                              Monto a entregar:
                            </label>
                            <input
                              id="amount"
                              type="number"
                              placeholder="Monto a consignar"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className={`w-full px-3 py-2 border rounded-md focus:outline-none`}
                            />
                          </div>
                          <div className="w-full">
                            <button
                              onClick={handleDevolverSaldo}
                              className={`w-full bg-green hover:bg-green hover:scale-105 duration-100 text-white font-bold py-2 px-4 rounded transition-all`}
                            >
                              Enviar
                            </button>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                    {idEmpleadoDetails.estado === "Solicitud" && (
                      <button
                        className="flex justify-center items-center gap-x-2 px-3 py-2 rounded-md text-white backdrop-blur-sm hover:backdrop-blur-lg bg-white/30 shadow"
                        onClick={handleCancelarSolicitud}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>

                        <p>Cancelar solicitud</p>
                      </button>
                    )}
                    <>
                      {idEmpleadoDetails.estado === "Activo" && (
                        <>
                          <button
                            className="flex justify-center items-center gap-x-2 px-3 py-2 rounded-md text-white backdrop-blur-sm hover:backdrop-blur-lg bg-white/30 shadow"
                            onClick={() => setOpenModal2(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.4}
                              stroke="currentColor"
                              className="size-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                              />
                            </svg>
                            <p>Solicitar saldo</p>
                          </button>
                          <Modal
                            className="bg-black bg-opacity-60 flex justify-center items-center w-screen h-screen p-0"
                            show={openModal2}
                            size="md"
                            onClose={() => setOpenModal2(false)}
                            popup
                          >
                            <Modal.Header>
                              <span className="text-xl py-2 pl-4 pr-3 font-medium text-gray-900 dark:text-white">
                                Solicitar Saldo
                              </span>
                            </Modal.Header>
                            <Modal.Body className="px-5 pt-2 pb-5">
                              <div className="space-y-6">
                                <div>
                                  <label
                                    htmlFor="amount"
                                    className="font-medium text-gray-700 dark:text-white"
                                  >
                                    Monto a Solicitar:
                                  </label>
                                  <input
                                    id="amount"
                                    type="number"
                                    placeholder="Monto a consignar"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none`}
                                  />
                                </div>
                                <div className="w-full">
                                  <button
                                    onClick={handleSolicitarSaldo}
                                    className={`w-full bg-green hover:bg-green hover:scale-105 duration-100 text-white font-bold py-2 px-4 rounded transition-all`}
                                  >
                                    Enviar
                                  </button>
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal>
                        </>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
            <Transfers />
          </div>
        </div>
      }
    </>
  );
};
