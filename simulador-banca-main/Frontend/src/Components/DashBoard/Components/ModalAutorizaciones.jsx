import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModalAutorizaciones = ({ data, showModal, closeModal }) => {
  const [descripcion, setDescripcion] = useState("");

  const handleDenegar = (id) => {
    try {
      // Realiza una solicitud al servidor para cambiar el estado del cliente con el ID proporcionado
      fetch(`http://localhost:3000/EstadoD/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nuevoEstado: "Denegado",
          descripcion: descripcion, // Agregamos la descripción al cuerpo de la solicitud
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          toast.success("Cuenta rechazada correctamente.");
          setTimeout(() => {
            window.location = "/DashBoardMenu";
          }, 1500);
        })

        .catch((error) => {
          console.error("Error el actualiza estado de la cuenta:", error);
        });
    } catch (error) {
      console.error("Error general:", error);
    }
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg bg-white shadow-sm w-full max-w-md">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex items-center justify-between">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Rechazar cuenta bancaria
                </h3>

                <button
                  type="button"
                  onClick={closeModal}
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
                Proporcione un motivo para rechazar esta cuenta bancaria.
              </p>
            </div>
            <div className="px-6 space-y-4">
              <div className="w-full">
                <div className="space-y-2">
                  <label
                    className="text-sm text-gray-600 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="idEmpleado"
                  >
                    Número de Cuenta
                  </label>
                  <input
                    id="idEmpleado"
                    type="number"
                    value={data?.num_cuenta || ""}
                    disabled
                    className="flex h-10 w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-sm placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <form className="">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 space-y-2">
                    <label
                      htmlFor="description"
                      className="text-sm text-gray-600 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Descripcion
                    </label>
                    <textarea
                      id="description"
                      value={descripcion}
                      onChange={handleDescripcionChange}
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border-gray-400 bg-white placeholder-gray-500 focus:border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Escribe la razón aquí..."
                    ></textarea>
                  </div>
                </div>
              </form>

              <div className="flex items-center pb-6">
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-white text-sm font-medium transition-colors bg-red-600 hover:bg-red-700 h-10 px-6 py-2 ml-auto"
                  onClick={() => handleDenegar(data.id_detalle)}
                >
                  Denegar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
