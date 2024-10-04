import React, { useEffect, useState } from "react";
import userProfile from "../../../../assets/Img/Login/user.png";
import { Pagination } from "../../../Pagination/Pagination";
import { useAuth } from "../../../../context/AuthContext";
import { dateFormatter } from "../../../../utils/dateFormatter";
import { saldoFormatter } from "../../../../utils/saldoFormatter";

export const ReportesMovimientos = () => {
  const [allMovimientos, setAllMovimientos] = useState([]);
  const [movementsPage, setMovementsPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const fetchMovimientos = async () => {
      try {
        const response = await fetch(
          "https://plataforma-bancaria.onrender.com/get_movimientos"
        );

        if (response.ok) {
          const data = await response.json();

          console.log("Datos obtenidos:", data);

          // Filtrar los datos basados en el rol del usuario
          if (user?.id_rol === 2) {
            // Filtrar solo los movimientos que tienen un cliente
            const filteredData = data.filter((item) => item.cliente);

            console.log("Datos filtrados para rol 2:", filteredData);

            setAllMovimientos(filteredData);
          } else {
            // Mostrar todos los movimientos si el rol no es 2
            setAllMovimientos(data);
          }
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovimientos();
  }, [user]); // Añade las dependencias necesarias para el efecto

  const movementsTotal = allMovimientos.length;
  const lastIndex = currentPage * movementsPage;
  const firstIndex = lastIndex - movementsPage;
  return (
    <section
      className="container p-4 mx-auto flex flex-col"
      style={{ minHeight: "87vh" }}
    >
      <div className="flex flex-col justify-center items-between flex-1">
        <div className="flex justify-between items-center gap-x-3">
          <div className="flex flex-col justify-center items-start">
            <div className="flex flex-row items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                Información de movimientos
              </h2>
              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                {movementsTotal} movimientos
              </span>
            </div>
            <p className="text-sm text-gray-500 m-0 p-0">
              Todos los movimientos realizados en el día
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-DarkSlate dark:bg-gray-800">
                      <tr>
                        <th className="px-3 py-4 text-sm font-normal rtl:text-right text-white dark:text-gray-400">
                          <span>ID Movimiento</span>
                        </th>
                        <th className="px- py-4 text-sm font-normal rtl:text-right text-white dark:text-gray-400">
                          <span>Realizado por</span>
                        </th>
                        <th className="px-6 py-4 text-sm font-normal rtl:text-right text-white dark:text-gray-400">
                          <span>Cliente</span>
                        </th>
                        <th className="px-4 py-3 text-sm font-normal rtl:text-right text-white dark:text-gray-400">
                          <span>Saldo</span>
                        </th>
                        <th className="px-4 py-4 text-sm font-normal rtl:text-right text-white dark:text-gray-400 ">
                          <span>Fecha y Hora</span>
                        </th>
                        <th className="px-4 py-4 text-sm font-normal rtl:text-right text-white dark:text-gray-400 w-40">
                          <span>Acción</span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {allMovimientos
                        .slice(firstIndex, lastIndex)
                        .map((data) => (
                          <tr key={data.id_movimiento}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                <span># {data.id_movimiento}</span>
                              </div>
                            </td>
                            <td className="px-2 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                <div className="flex justify-start items-center gap-x-2 w-40">
                                  <img
                                    className="object-cover w-10 h-10 rounded-full"
                                    src={userProfile}
                                    alt=""
                                  />
                                  <div>
                                    {data.empleado ? (
                                      <>
                                        <h2 className="font-medium text-gray-800 dark:text-white">
                                          {data.empleado}
                                        </h2>
                                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                          {data.rol}
                                        </p>
                                      </>
                                    ) : (
                                      <h2>Usuario eliminado</h2>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                {data.consing_em ? (
                                  <div className="flex justify-center items-center gap-x-2">
                                    <img
                                      className="object-cover w-10 h-10 rounded-full"
                                      src={userProfile}
                                      alt=""
                                    />
                                    <div>
                                      <h2 className="font-medium text-gray-800 dark:text-white">
                                        {data.empleado_consing}
                                      </h2>
                                      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        {data.rol_consing}
                                      </p>
                                    </div>
                                  </div>
                                ) : data.cliente ? (
                                  <>
                                    <div className="flex flex-col justify-center items-center">
                                      <h2 className="font-medium text-gray-800 dark:text-white">
                                        {data.cliente}
                                      </h2>
                                      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        N° {data.num_cuenta}
                                      </p>
                                    </div>
                                  </>
                                ) : (
                                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Bóveda
                                  </p>
                                )}
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                <span>{saldoFormatter(data.saldo)}</span>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                <span>{dateFormatter(data.fecha)}</span>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap w-32">
                              <div className="flex justify-center items-center">
                                {data.id_tipomov === 1 && (
                                  <>
                                    <div className="flex justify-center items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                      <span className="text-emerald-500">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.3}
                                          stroke="currentColor"
                                          className="size-4"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                          />
                                        </svg>
                                      </span>

                                      <h2 className="text-sm font-normal text-emerald-500">
                                        {data.tipo_movimiento}
                                      </h2>
                                    </div>
                                  </>
                                )}

                                {data.id_tipomov === 2 && (
                                  <>
                                    <div className="flex justify-center items-center px-3 py-1 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                                      <span className="text-red-500">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="size-4"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 12h14"
                                          />
                                        </svg>
                                      </span>

                                      <h2 className="text-sm font-normal text-red-500">
                                        {data.tipo_movimiento}
                                      </h2>
                                    </div>
                                  </>
                                )}

                                {data.id_tipomov === 3 && (
                                  <>
                                    <div className="flex justify-center items-center px-3 py-1 rounded-full gap-x-2 bg-amber-100/60 dark:bg-gray-800">
                                      <span className="text-amber-500">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.3}
                                          stroke="currentColor"
                                          className="size-4"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                          />
                                        </svg>
                                      </span>

                                      <h2 className="text-sm font-normal text-amber-500">
                                        {data.tipo_movimiento}
                                      </h2>
                                    </div>
                                  </>
                                )}

                                {data.id_tipomov === 4 && (
                                  <>
                                    <div className="flex justify-center items-center px-3 py-1 rounded-full gap-x-2 bg-orange-100/60 dark:bg-gray-800">
                                      <span className="text-orange-500">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.3}
                                          stroke="currentColor"
                                          className="size-4"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 12h14"
                                          />
                                        </svg>
                                      </span>

                                      <h2 className="text-sm font-normal text-orange-500">
                                        {data.tipo_movimiento}
                                      </h2>
                                    </div>
                                  </>
                                )}

                                {data.id_tipomov === 5 && (
                                  <>
                                    <div className="flex justify-center items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                      <span className="text-emerald-500">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.3}
                                          stroke="currentColor"
                                          className="size-4"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                          />
                                        </svg>
                                      </span>

                                      <h2 className="text-sm font-normal text-emerald-500">
                                        {data.tipo_movimiento}
                                      </h2>
                                    </div>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Pagination
              movementsPage={movementsPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              movementsTotal={movementsTotal}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
