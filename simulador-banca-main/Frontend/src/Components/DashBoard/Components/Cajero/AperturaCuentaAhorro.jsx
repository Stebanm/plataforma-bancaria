import React, { useEffect, useState } from "react";
import ConsgnacionCuentaAhorro from "../Cajero/ConsignacionCuentaAhorro";

const AperturaCuentaAhorro = () => {
  const [openConsignacion, setOpenConsignacion] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  const firstCosing = async () => {
    try {
      const response = await fetch("http://localhost:3000/firstConsing");
      if (!response.ok) {
        if (response.status === 404) {
          console.error("Información no encontrada");
          return;
        }
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataUser(data);
    } catch (error) {
      console.error("Error fetching information:", error);
    }
  };

  const openModal = (data) => {
    setModalData(data);
    setOpenConsignacion(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      firstCosing();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <section className="container p-4 mx-auto" style={{ minHeight: "87vh" }}>
        <div className="flex flex-col justify-center items-between h-full">
          <div className="flex justify-between items-center gap-x-3">
            <div className="flex flex-col justify-center items-start">
              <div className="flex flex-row items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                  Nuevas Cuentas
                </h2>
              </div>
              <p className="text-sm text-gray-500 m-0 p-0">
                Primera Consignación
              </p>
            </div>
          </div>

          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
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
                              <span>Nombre de Cliente</span>
                            </button>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                        >
                          <div className="flex justify-center items-center gap-x-3">
                            <button>
                              <span>Producto bancario</span>
                            </button>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                        >
                          <div className="flex justify-center items-center gap-x-2">
                            <button>
                              <span>N° Cuenta</span>
                            </button>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                        >
                          <div className="flex justify-center items-center gap-x-2">
                            <button>
                              <span> Acción</span>
                            </button>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {dataUser.length > 0 ? (
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {dataUser?.map((data) => (
                          <React.Fragment key={data.id_detalle}>
                            <tr>
                              <td className="px-8 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="w-full inline-flex justify-center items-center gap-x-3">
                                  <h2 className="font-medium text-gray-800 dark:text-white ">
                                    {data.nombre}
                                  </h2>
                                </div>
                              </td>

                              <td className="px-8 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="w-full inline-flex justify-center items-center gap-x-3">
                                  <h2 className="text-sm font-normal text-gray-500 dark:text-white ">
                                    {data.descripcion}
                                  </h2>
                                </div>
                              </td>

                              <td className="px-8 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="w-full inline-flex justify-center items-center gap-x-3">
                                  <h2 className="text-sm font-normal text-gray-500 dark:text-white ">
                                    {" "}
                                    {data.num_cuenta}
                                  </h2>
                                </div>
                              </td>

                              <td className="flex justify-center px-8 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-2 px-3 py-1 text-gray-500 dark:text-gray-400">
                                  <button
                                    className="text-gray-500 transition-colors duration-200 dark:hover:text-bg-emerald-500 dark:text-gray-300 hover:text-red-600 focus:outline-none"
                                    onClick={() => openModal(data)}
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
                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
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
        </div>

        <ConsgnacionCuentaAhorro
          modalData={modalData}
          setModalData={setModalData}
          openConsignacion={openConsignacion}
          setOpenConsignacion={setOpenConsignacion}
        />
      </section>
    </>
  );
};

export default AperturaCuentaAhorro;
