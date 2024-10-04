import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const ModalCreateAccount = ({ data, user, openModal, setOpenModal }) => {
  const [tipoCuenta, setTipoCuenta] = useState("");

  const { handleSubmit } = useForm();

  const createAccount = async () => {
    const id_cliente = data.id_cliente;
    const id_empleado = user.id_empleado;

    try {
      const response = await fetch(
        `https://plataforma-bancaria.onrender.com/create_account/${id_cliente}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idEmpleado: id_empleado,
            tipoCuenta: tipoCuenta,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast.success("Cuenta creada correctamente.");
      setOpenModal(!openModal);

      setTimeout(() => {
        window.location = "/DashBoardMenu";
      }, 1500);
    } catch (error) {
      console.error("Error general:", error);
    }
  };

  const closeModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      {openModal && (
        <form onSubmit={handleSubmit(createAccount)}>
          <div className="fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-50 z-50">
            <div className="rounded-lg bg-white shadow-sm w-full max-w-md p-4">
              <div className="flex flex-col justify-center items-center gap-y-6">
                <div className="flex flex-col justify-between space-y-1.5 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="whitespace-nowrap text-2xl font-semibold">
                      ¿Desea crear una nueva cuenta?
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent transition hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={closeModal}
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

                <div className="my-6 w-full">
                  <select
                    className="flex h-10 w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-500 focus:border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus-visible:outline-none"
                    value={tipoCuenta}
                    onChange={(e) => setTipoCuenta(e.target.value)}
                  >
                    <option value="">Seleccione el tipo de cuenta</option>
                    <option value="1">Cuenta de Ahorros</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                    tipoCuenta
                      ? "bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!tipoCuenta}
                >
                  Crear Cuenta
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
