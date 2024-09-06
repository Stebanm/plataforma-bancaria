import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ModalCreacionU = ({ data, showModal, closeModal }) => {
  const { register, handleSubmit, setValue } = useForm();

  const AddUser = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/add_user", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          id_rol: data.id_rol,
        }),
      });

      if (response.ok) {
        toast.success("Creación exitosa");
        setTimeout(() => {
          window.location = "/DashBoardMenu";
        }, 1500);
        setForceUpdate((prev) => !prev);
      } else {
        console.error("Error al registrar usuario");
        toast.error("Error al registrar usuario");
        // Puedes agregar una notificación de error específica para problemas de red
        // toast.error("Error de red, por favor inténtalo de nuevo más tarde");
      }
    } catch (error) {
      console.error("Error en el servidor", error);
      // Agrega una notificación de error para problemas de red
      // toast.error("Error de red, por favor inténtalo de nuevo más tarde");
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg bg-white shadow-sm w-full max-w-md">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex items-center justify-between">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Crear nuevo usuario
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
                Complete el siguiente formulario para crear una nueva cuenta de
                usuario.
              </p>
            </div>

            <form onSubmit={handleSubmit(AddUser)}>
              <div className="px-6 space-y-4">
                <div className="flex justify-between flex-wrap w-full gap-y-2">
                  <div className="space-y-2 w-full md:w-auto">
                    <label
                      className="text-sm text-gray-600 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="username"
                    >
                      Nombre de usuario
                    </label>
                    <input
                      id="username"
                      placeholder="Ingrese nombre"
                      type="text"
                      className="flex h-10 w-full rounded-md border-gray-400 bg-white px-3 py-2 text-sm placeholder-gray-500 focus:border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("username", { required: true })}
                      required=""
                    />
                  </div>

                  <div className="space-y-2 w-full md:w-auto">
                    <label
                      className="text-sm text-gray-600 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <input
                      id="password"
                      placeholder="Ingrese contraseña"
                      type="text"
                      className="flex h-10 w-full rounded-md border-gray-400 bg-white px-3 py-2 text-sm placeholder-gray-500 focus:border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("password", { required: true })}
                      required=""
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm text-gray-600 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="rol"
                  >
                    Rol
                  </label>
                  <select
                    name="id_rol"
                    id="id_rol"
                    className="rounded-md w-full border bg-white border-gray-400 text-gray-900 text-sm p-2.5 focus:border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("id_rol", { required: true })}
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    <option value="2">Asesor</option>
                    <option value="3">Cajero</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center p-6">
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-white text-sm font-medium transition-colors bg-emerald-600 hover:bg-emerald-700 h-10 px-6 py-2 ml-auto"
                  type="submmit"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
