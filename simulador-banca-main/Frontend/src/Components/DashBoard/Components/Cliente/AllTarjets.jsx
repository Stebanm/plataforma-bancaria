import React from "react";

import CreditCard from "../../../../assets/Img/Client/creditcard.png";

export const AllTarjets = ({ userData, onSelectAccount, contenidoCliente }) => {
  const sectionStyle =
    contenidoCliente === "ClientTarjet"
      ? { minHeight: "83vh" }
      : { minHeight: "51vh" };

  return (
    <>
      <section className="mt-4" style={sectionStyle}>
        {contenidoCliente === "ClientTarjet" && (
          <h1 className="text-xl font-medium mb-4">Tus tarjetas</h1>
        )}
        <ul className="flex flex-col justify-between items-start mx-auto p-4 bg-white rounded">
          {contenidoCliente === "ClientView" && (
            <h1 className="text-xl font-medium">Tus tarjetas</h1>
          )}

          {/* Filtra cuenta autorizadas en el contenido "ClientView" */}
          {contenidoCliente === "ClientView"
            ? userData
                .filter((data) => data.estado_cuenta === "Autorizado")
                .map((data) => (
                  <React.Fragment key={data.id_detalle}>
                    <div className="w-full border-b border-gray-200 py-3">
                      <li>
                        <div className="flex flex-row justify-between items-center">
                          <div className="flex flex-row justify-center items-center">
                            <img src={CreditCard} className="h-16 sm:h-20" />
                            <div className="py-6 px-8 flex flex-col gap-4">
                              <div className="flex flex-col items-start justify-center   font-semibold leading-normal text-black">
                                <div className="text-normal sm:text-lg md:text-xl">
                                  {data.num_cuenta}
                                </div>
                                <div className="text-xs sm:text-xs">
                                  {data.descripcion}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center items-end gap-4">
                            <div className="flex flex-col justify-center items-center gap-4">
                              <div className="flex justify-center items-center px-3 py-2 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                <span className="text-emerald-500 text-xs sm:text-sm md:text-base">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                </span>
                                <h2 className="text-xs sm:text-sm md:text-md font-normal text-emerald-500">
                                  Activa
                                </h2>
                              </div>

                              <button
                                className="border-solid border border-DarkSlate px-2 py-1 text-sm rounded-md text-DarkSlate hover:bg-DarkSlate hover:text-white transition sm:px-4 sm:py-2 sm:text-base sm:rounded-lg"
                                onClick={() => onSelectAccount(data)}
                              >
                                Seleccionar
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </div>
                  </React.Fragment>
                ))
            : // Muestra todas las cuentas sin importar el contenido
              userData.map((data) => (
                <React.Fragment key={data.id_detalle}>
                  <div className="w-full border-b border-gray-200 py-3">
                    <li>
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-center items-center">
                          <img src={CreditCard} className="h-16 sm:h-20" />
                          <div className="py-6 px-8 flex flex-col gap-4">
                            <div className="flex flex-col items-start justify-center   font-semibold leading-normal text-black">
                              <div className="text-normal sm:text-lg md:text-xl">
                                {data.num_cuenta}
                              </div>
                              <div className="text-xs sm:text-xs">
                                {data.descripcion}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-end gap-4">
                          {data.estado_cuenta === "Autorizado" && (
                            <div className="flex flex-col justify-center items-center gap-4">
                              <div className="flex justify-center items-center px-3 py-2 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                <span className="text-emerald-500 text-xs sm:text-sm md:text-base">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                </span>

                                <h2 className="text-xs sm:text-sm md:text-md font-normal text-emerald-500">
                                  Activa
                                </h2>
                              </div>

                              <button
                                className="border-solid border border-DarkSlate px-2 py-1 text-sm rounded-md text-DarkSlate hover:bg-DarkSlate hover:text-white transition sm:px-4 sm:py-2 sm:text-base sm:rounded-lg"
                                onClick={() => onSelectAccount(data)}
                              >
                                Seleccionar
                              </button>
                            </div>
                          )}

                          {data.estado_cuenta === "Pendiente" && (
                            <div className="flex justify-center items-center px-3 py-2 rounded-full gap-x-2 bg-amber-100/60 dark:bg-gray-800">
                              <span className="text-amber-500">
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
                                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                  />
                                </svg>
                              </span>

                              <h2 className="text-md font-normal text-amber-500">
                                Pendiente
                              </h2>
                            </div>
                          )}

                          {data.estado_cuenta === "Denegado" && (
                            <div className="flex justify-center items-center px-3 py-2 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                              <span className="text-red-500">
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
                                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                              </span>

                              <h2 className="text-md font-normal text-red-500">
                                Cuenta Rechazada
                              </h2>
                            </div>
                          )}

                          {data.estado_cuenta === "Consignar" && (
                            <div className="flex justify-center items-center px-3 py-2 rounded-full gap-x-2 bg-amber-100/60 dark:bg-gray-800">
                              <span className="text-amber-500">
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
                                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                  />
                                </svg>
                              </span>

                              <h2 className="text-md font-normal text-amber-500">
                                Pendiente
                              </h2>
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  </div>
                </React.Fragment>
              ))}
        </ul>
      </section>
    </>
  );
};
