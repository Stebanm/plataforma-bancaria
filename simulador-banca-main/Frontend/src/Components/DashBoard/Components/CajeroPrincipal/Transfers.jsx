import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { toast } from "react-toastify";
import userProfile from "../../../../assets/Img/Login/user.png";
import { ModalConsignarCajero } from "./ModalConsignarCajero";
import { useAuth } from "../../../../context/AuthContext";

const Transfers = () => {
  const [empleadoDetails, setEmpleadoDetails] = useState([]);
  const [filterEmpleados, setFilterEmpleados] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [idEmpleadoDetails, setIdEmpleadoDetails] = useState([]);
  const [amountSolicitud, setAmountSolicitud] = useState("");

  const [openModal1, setOpenModal1] = useState(false);
  const [openConsing, setOpenConsing] = useState(false);

  const { user } = useAuth();

  const fetchEmpleados = async () => {
    try {
      const response = await fetch("http://localhost:3000/get_users");
      if (response.ok) {
        const data = await response.json();
        setEmpleadoDetails(data);
        const filteredEmpleados = data.filter(
          (empleado) => empleado.estado === "Solicitud"
        );

        setFilterEmpleados(filteredEmpleados);
      } else {
        console.error("Error fetching user info:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Funcion para traer un empleado por id.
  const fetchEmpleadoId = async (idEmpleado) => {
    try {
      const response = await fetch(
        `http://localhost:3000/get_users/${idEmpleado}`
      );
      if (response.ok) {
        const data = await response.json();
        setIdEmpleadoDetails(data);

        setAmountSolicitud(data.saldo_solicitado);
      } else {
        console.error("Error fetching user info:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Función para cancelar la solicitud
  const handleCancel = async (empleado) => {
    const { id_empleado, saldo, estado } = empleado;

    const newBalanceEmpleado = parseFloat(saldo);

    if (estado === "Solicitud") {
      try {
        const responseEmpleado = await fetch(
          `http://localhost:3000/balance_request/${id_empleado}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nuevoSaldo: newBalanceEmpleado,
              newStatus: "Activo",
              saldoSolicitado: 0,
            }),
          }
        );

        if (!responseEmpleado.ok) {
          throw new Error("Network response was not ok");
        }

        toast.success("Solicitud cancelada correctamente.");
        setTimeout(() => {
          window.location = "/DashBoardMenu";
        }, 1500);
      } catch (error) {
        toast.error("Error al cancelar la solicitud.");
      }
    } else {
      toast.error(
        "Error al cancelar la solicitud: El usuario la cancelo primero."
      );
    }
  };

  // Función para formatear el costo a miles sin decimales.
  const formatSaldo = (saldo) => {
    // Crea una instancia de Intl.NumberFormat con la configuración regional "es-CO" (Colombia)
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
    });

    // Formatea el costo usando la configuración especificada.
    return formatter.format(saldo);
  };

  const openModal = (idEmpleado) => {
    fetchEmpleadoId(idEmpleado);
    setOpenConsing(!openConsing);
  };

  const onCloseModal = () => {
    setOpenModal1(false);
    setSelectedEmpleado(null);
    setAmount(""); // Reset amount when closing the modal
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEmpleados();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container px-0 lg:px-4 mx-auto mt-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Cajeros
        </h2>
      </div>

      <div className="flex flex-col mt-2">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-4 lg:px-6 xl:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-DarkSlate dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                    >
                      <div className="flex justify-center items-center gap-x-3">
                        <button>
                          <span>ID Empleado</span>
                        </button>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                    >
                      <div className="flex justify-center items-center gap-x-3">
                        <button>
                          <span>Solicitud por</span>
                        </button>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                    >
                      <div className="flex justify-center items-center gap-x-2">
                        <button>
                          <span>Saldo solicitado</span>
                        </button>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                    >
                      <div className="flex justify-center items-center gap-x-2">
                        <button>
                          <span>Acción</span>
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>

                {filterEmpleados.length > 0 ? (
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {filterEmpleados.map(
                      (empleado) =>
                        user.id_empleado !== empleado.id_empleado && (
                          <tr key={empleado.id_empleado}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span># {empleado.id_empleado}</span>
                              </div>
                            </td>
                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <div className="flex items-center gap-x-2">
                                  <img
                                    className="object-cover w-10 h-10 rounded-full"
                                    // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                    src={userProfile}
                                    alt=""
                                  />
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white">
                                      {empleado.username}
                                    </h2>
                                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                      Cajeros
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>
                                  {formatSaldo(empleado.saldo_solicitado)}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-4">
                                <button
                                  className="flex justify-center items-center dark:bg-gray-800"
                                  onClick={() =>
                                    openModal(empleado.id_empleado)
                                  }
                                >
                                  {/* <h2 className="text-md font-normal text-emerald-500 group-hover:text-white">
                              Transferir Saldo
                            </h2> */}
                                  <span className="text-gray-500 hover:text-emerald-600">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.6}
                                      stroke="currentColor"
                                      className="size-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                      />
                                    </svg>
                                  </span>
                                </button>

                                {user.id_rol !== 3 && (
                                  <button
                                    className="flex justify-center items-center dark:bg-gray-800"
                                    onClick={() => handleCancel(empleado)}
                                  >
                                    {/* <h2 className="text-md font-normal text-red-500 group-hover:text-white">
                              Cancelar Solicitud
                            </h2> */}
                                    <span className="text-gray-500 hover:text-red-600">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.6}
                                        stroke="currentColor"
                                        className="size-5"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                      </svg>
                                    </span>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                ) : (
                  <>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      <tr>
                        <td
                          colSpan="4"
                          className="px-6 py-4 text-center text-gray-700 dark:text-gray-400"
                        >
                          <section className="bg-white dark:bg-gray-900">
                            <div className="container flex items-center min-h-5/6 px-6 py-12 mx-auto">
                              <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                                <p className="p-2 text-sm font-medium text-blue-500 bg-lightgreen dark:bg-gray-800 inline-flex items-center rounded-full">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="green"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                    />
                                  </svg>
                                </p>

                                <p className="mt-4 text-gray-500 dark:text-gray-400">
                                  No se encuentran cajeros solicitantes
                                </p>
                              </div>
                            </div>
                          </section>
                        </td>
                      </tr>
                    </tbody>
                  </>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      <ModalConsignarCajero
        openConsing={openConsing}
        setOpenConsing={setOpenConsing}
        idEmpleadoDetails={idEmpleadoDetails}
        setIdEmpleadoDetails={setIdEmpleadoDetails}
        empleadoDetails={empleadoDetails}
        amountSolicitud={amountSolicitud}
      />
    </section>
  );
};

export default Transfers;
