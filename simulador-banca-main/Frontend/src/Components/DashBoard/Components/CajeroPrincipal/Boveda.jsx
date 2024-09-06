import React, { useEffect, useState } from "react";

const Boveda = () => {
  const [bovedaDetails, setBovedaDetails] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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

  // Función para manejar el clic del ícono del ojo
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    fetchBoveda();
  });
  return (
    <>
      <div className="container p-4 mx-auto" style={{ minHeight: "87vh" }}>
        <div className="flex justify-center items-center flex-col">
          <div className="w-full sm:w-1/2">
            <div className="w-full sm:w-full sm:flex-none">
              <div className="flex px-4 py-8 flex-col bg-DarkSlate rounded-md bg-clip-border">
                <div>
                  <h1 className="text-md xl:text-xl font-normal text-white dark:opacity-60">
                    Saldo Total de Bóveda
                  </h1>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg md:text-xl lg:text-3xl xl:text-4xl 2xl:text-3xl font-bold text-white">
                      {isVisible
                        ? formatSaldo(bovedaDetails.saldo_boveda)
                        : "****"}
                    </p>

                    <div className="text-white flex justify-center items-center">
                      <button onClick={toggleVisibility}>
                        {isVisible ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5 2xl:size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5 2xl:size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <button className="w-full mt-4 p-2 bg-transparent border border-emerald-500 text-emerald-500 rounded-md transition hover:bg-emerald-500 group">
              <p className="font-semibold text-xl group-hover:text-white">
                Consignar
              </p>
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Boveda;
