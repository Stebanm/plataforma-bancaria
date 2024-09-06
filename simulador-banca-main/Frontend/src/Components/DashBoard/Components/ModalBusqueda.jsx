import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export const ModalBusqueda = ({ showModal, setShowModal, data }) => {
  const [localData, setLocalData] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data) {
      setLocalData({ ...data });
      // Actualizar los valores de los campos del formulario cuando cambia data
      setValue("nombre", data.nombre || "");
      setValue("primer_apellido", data.primerapellido || "");
      setValue("segundo_apellido", data.segundoapellido || "");
      setValue("tipo_documento", data.tipodocumento || "");
      setValue("num_documento", data.ip_documento || "");
      setValue("lugar_expedicion", data.ciudadnacimiento || "");
      setValue(
        "fecha_expedicion",
        data.fechaexpedicion
          ? new Date(data.fechaexpedicion).toISOString().split("T")[0]
          : ""
      );
      setValue(
        "fecha_nacimiento",
        data.fechanacimiento
          ? new Date(data.fechanacimiento).toISOString().split("T")[0]
          : ""
      );
      setValue("ciudad_nacimiento", data.ciudadnacimiento || "");
      setValue("genero", data.gen || "");
      setValue("estado_civil", data.estadocivil || "");
      setValue("nacionalidad", data.nacionalidad || "");
      setValue("direccion_residencia", data.direccion || "");
      setValue("barrio", data.barrio || "");
      setValue("ciudad", data.ciudad || "");
      setValue("departamento", data.depa || "");
      setValue("pais", data.pais || "");
      setValue("telefono", data.telefono || "");
      setValue("celular", data.celular || "");
      setValue("correo_electronico", data.correo || "");
      setValue("profesion", data.profesion || "");
      setValue("ocupacion", data.ocupacion || "");
      setValue("actividad", data.actividad || "");
      setValue("ingresos_mensuales", data.ingresosmensuales || "");
      setValue("otros_ingresos", data.otrosingresos || "");
      setValue("renta", data.renta || "");
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/update_client/${data.id_cliente}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el cliente");
      }
      const result = await response.json();
      toast.success("Información del cliente actualizada correctamente.");

      setShowModal(false);
      setTimeout(() => {
        window.location = "/DashBoardMenu";
      }, 1500);
    } catch (error) {
      console.error("Error al actualizar el cliente", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          key={data.id_cliente}
        >
          <div className="w-full lg:w-4/5 bg-white rounded-lg p-4 max-h-screen overflow-y-auto">
            <div className="bg-white rounded-lg">
              <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-4 h-4 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
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

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-3 items-center justify-center flex-col bg-white">
                  <h1 className="w-2/4 text-black text-2xl flex items-center justify-center font-semibold text-center p-2 border-b-2 border-lightGreen">
                    Información del Cliente
                  </h1>
                  <div
                    className="w-12/12 flex justify-center items-center "
                    style={{ minHeight: "55vh" }}
                  >
                    <div className="grid justify-center gap-x-10 gap-y-5 p-5 lg:grid-cols-4">
                      <div>
                        <label className="block text-sm text-gray-500">
                          Nombre Completo:
                        </label>
                        <input
                          type="text"
                          {...register("nombre", {
                            pattern: {
                              value: /^[A-Za-z ]+$/i,
                              message: "Digita solo letras",
                            },
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 3,
                              message: "Minimo 3 letras",
                            },
                            maxLength: {
                              value: 20,
                              message: "Maximo 20 letras",
                            },
                          })}
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40 dark:focus:border-emerald-300"
                        />
                        {errors.nombre && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>
                            <span className="text-sm">
                              {errors.nombre.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Primer Apellido
                        </label>
                        <input
                          type="text"
                          {...register("primer_apellido", {
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message: "Digita solo letras",
                            },
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 3,
                              message: "Minimo 3 letras",
                            },
                            maxLength: {
                              value: 15,
                              message: "Maximo 15 letras",
                            },
                          })}
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40 dark:focus:border-emerald-300"
                        />
                        {errors.primer_apellido && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>
                            <span className="text-sm">
                              {errors.primer_apellido.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Segundo Apellido
                        </label>
                        <input
                          type="text"
                          {...register("segundo_apellido", {
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message: "Digita solo letras",
                            },
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 3,
                              message: "Minimo 3 letras",
                            },
                            maxLength: {
                              value: 15,
                              message: "Maximo 15 letras",
                            },
                          })}
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40 dark:focus:border-emerald-300"
                        />
                        {errors.segundo_apellido && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>
                            <span className="text-sm">
                              {errors.segundo_apellido.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="opciones"
                          className="block text-sm text-gray-500"
                        >
                          Tipo de documento:
                        </label>
                        <select
                          id="opciones"
                          {...register("tipo_documento", {
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                          })}
                          name="tipo_documento"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        >
                          <option value="">Seleccionar</option>
                          <option value="CC">C.C.</option>
                          <option value="TI">T.I.</option>
                          <option value="RCivil">R. Civil</option>
                          <option value="CE">Cédula extranjería</option>
                          <option value="PP">Pasaporte</option>
                          <option value="CD">Carné diplomático</option>
                        </select>
                        {errors.tipo_documento && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.tipo_documento.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          N° de documento
                        </label>
                        <input
                          type="number"
                          {...register("num_documento", {
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 6,
                              message: "Minimo 6 numeros",
                            },
                            maxLength: {
                              value: 10,
                              message: "Maximo 10 numeros",
                            },
                          })}
                          pattern="[0-9]*"
                          name="num_documento"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.num_documento && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.num_documento.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Lugar de expedición
                        </label>
                        <input
                          type="text"
                          {...register("lugar_expedicion", {
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message: "Digita solo letras",
                            },
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 3,
                              message: "Minimo 3 letras",
                            },
                            maxLength: {
                              value: 20,
                              message: "Maximo 15 letras",
                            },
                          })}
                          name="lugar_expedicion"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.lugar_expedicion && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.lugar_expedicion.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Fecha de expedición
                        </label>
                        <input
                          type="date"
                          {...register("fecha_expedicion", {
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                          })}
                          name="lugar_expedicion"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.lugar_expedicion && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.lugar_expedicion.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Fecha de nacimiento
                        </label>
                        <input
                          type="date"
                          {...register("fecha_nacimiento", {
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                          })}
                          name="fecha_nacimiento"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.fecha_nacimiento && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.fecha_nacimiento.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Ciudad de nacimiento
                        </label>
                        <input
                          type="text"
                          {...register("ciudad_nacimiento", {
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message: "Digita solo letras",
                            },
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 3,
                              message: "Minimo 3 letras",
                            },
                            maxLength: {
                              value: 20,
                              message: "Maximo 20 letras",
                            },
                          })}
                          name="ciudad_nacimiento"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.ciudad_nacimiento && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.ciudad_nacimiento.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="opciones"
                          className="block text-sm text-gray-500"
                        >
                          Genero:
                        </label>
                        <select
                          id="opciones"
                          {...register("genero", {
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                          })}
                          name="genero"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        >
                          <option value="">Seleccionar</option>
                          <option value="F">Femenino</option>
                          <option value="M">Masculino</option>
                        </select>
                        {errors.genero && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.genero.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="opciones"
                          className="block text-sm text-gray-500"
                        >
                          Estado Civil:
                        </label>
                        <select
                          id="opciones"
                          {...register("estado_civil", {
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                          })}
                          name="estado_civil"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        >
                          <option value="">Seleccionar</option>
                          <option value="Soltero">Soltero</option>
                          <option value="Casado">Casado</option>
                          <option value="UL">Unión libre</option>
                        </select>
                        {errors.estado_civil && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.estado_civil.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Nacionalidad
                        </label>
                        <input
                          type="text"
                          {...register("nacionalidad", {
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message: "Digita solo letras",
                            },
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 3,
                              message: "Minimo 3 letras",
                            },
                            maxLength: {
                              value: 15,
                              message: "Maximo 15 letras",
                            },
                          })}
                          name="nacionalidad"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.nacionalidad && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.nacionalidad.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Dirección residencia
                        </label>
                        <input
                          type="text"
                          {...register("direccion_residencia", {
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 3,
                              message: "Minimo 3 digitos",
                            },
                            maxLength: {
                              value: 30,
                              message: "Maximo 30 digitos",
                            },
                          })}
                          name="direccion_residencia"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.direccion_residencia && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.direccion_residencia.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Barrio
                        </label>
                        <input
                          type="text"
                          {...register("barrio", {
                            pattern: {
                              value: /^[A-Za-z ]+$/i,
                              message: "Digita solo letras",
                            },
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 3,
                              message: "Minimo 3 letras",
                            },
                            maxLength: {
                              value: 15,
                              message: "Maximo 15 letras",
                            },
                          })}
                          name="barrio"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.barrio && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.barrio.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Ciudad/Municipio
                        </label>
                        <input
                          type="text"
                          {...register("ciudad", {
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message: "Digita solo letras",
                            },
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 3,
                              message: "Minimo 3 letras",
                            },
                            maxLength: {
                              value: 20,
                              message: "Maximo 20 letras",
                            },
                          })}
                          name="ciudad"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.ciudad && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.ciudad.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Departamento
                        </label>
                        <input
                          type="text"
                          {...register("departamento", {
                            pattern: {
                              value: /^[A-Za-z\s]+$/i,
                              message: "Digita solo letras",
                            },
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 3,
                              message: "Minimo 3 letras",
                            },
                            maxLength: {
                              value: 15,
                              message: "Maximo 15 letras",
                            },
                          })}
                          name="departamento"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.departamento && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.departamento.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          País
                        </label>
                        <input
                          type="text"
                          {...register("pais", {
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message: "Digita solo letras",
                            },
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 3,
                              message: "Minimo 3 letras",
                            },
                            maxLength: {
                              value: 20,
                              message: "Maximo 20 letras",
                            },
                          })}
                          name="pais"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.pais && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.pais.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Teléfono
                        </label>
                        <input
                          type="number"
                          {...register("telefono", {
                            minLength: {
                              value: 10,
                              message: "Minimo 10 Numeros",
                            },
                            maxLength: {
                              value: 13,
                              message: "Maximo 13 Numeros",
                            },
                          })}
                          pattern="[0-9]*"
                          name="telefono"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.telefono && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.telefono.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Celular
                        </label>
                        <input
                          type="number"
                          {...register("celular", {
                            required: {
                              value: true,
                            },
                            minLength: {
                              value: 10,
                              message: "Minimo 10 Numeros",
                            },
                            maxLength: {
                              value: 13,
                              message: "Maximo 13 Numeros",
                            },
                          })}
                          pattern="[0-9]*"
                          name="celular"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.celular && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.celular.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          required
                          {...register("correo_electronico")}
                          name="correo_electronico"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Profesión
                        </label>
                        <input
                          type="text"
                          {...register("profesion", {
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message: "Digita solo letras",
                            },
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 3,
                              message: "Minimo 3 letras",
                            },
                            maxLength: {
                              value: 15,
                              message: "Maximo 15 letras",
                            },
                          })}
                          name="profesion"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.profesion && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.profesion.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="opciones"
                          className="block text-sm text-gray-500"
                        >
                          Ocupación/Oficio:
                        </label>
                        <select
                          id="opciones"
                          {...register("ocupacion", {
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                          })}
                          name="ocupacion"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        >
                          <option value="">Seleccionar</option>
                          <option value="Empleado">Empleado</option>
                          <option value="Pensionado">Pensionado</option>
                          <option value="Ama de casa">Ama de casa</option>
                          <option value="Estudiante">Estudiante</option>
                          <option value="Ganadero">Ganadero</option>
                          <option value="Comerciante">Comerciante</option>
                          <option value="Agricultor">Agricultor</option>
                          <option value="RC">Rentista de capital</option>
                          <option value="Independiente">Independiente</option>
                          <option value="DSI">Desempleado sin ingresos</option>
                          <option value="DCI">Desempleado con ingresos</option>
                          <option value="PI">Profesional independiente</option>
                          <option value="SOE">Socio o Empleado-socio</option>
                        </select>
                        {errors.ocupacion && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.ocupacion.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Actividad económica principal
                        </label>
                        <input
                          type="text"
                          {...register("actividad", {
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message: "Digita solo letras",
                            },
                            minLength: {
                              value: 3,
                              message: "Minimo 3 letras",
                            },
                            maxLength: {
                              value: 15,
                              message: "Maximo 15 letras",
                            },
                          })}
                          name="actividad"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.actividad && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.actividad.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Ingresos mensuales
                        </label>
                        <input
                          type="number"
                          {...register("ingresos_mensuales", {
                            minLength: {
                              value: 1,
                              message: "Minimo 1 numeros",
                            },
                            maxLength: {
                              value: 8,
                              message: "Maximo 8 numeros",
                            },
                          })}
                          pattern="[0-9]*"
                          name="ingresos_mensuales"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.ingresos_mensuales && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.ingresos_mensuales.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm text-gray-500">
                          Otros ingresos mensuales
                        </label>
                        <input
                          type="number"
                          {...register("otros_ingresos", {
                            minLength: {
                              value: 1,
                              message: "Minimo 1 numeros",
                            },
                            maxLength: {
                              value: 8,
                              message: "Maximo 8 numeros",
                            },
                          })}
                          pattern="[0-9]*"
                          name="otros_ingresos"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        />
                        {errors.otros_ingresos && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.otros_ingresos.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="opciones"
                          className="block text-sm text-gray-500"
                        >
                          ¿Es declarante de renta?:
                        </label>
                        <select
                          id="opciones"
                          {...register("renta", {
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                          })}
                          name="renta"
                          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40  dark:focus:border-emerald-300"
                        >
                          <option value="">Seleccionar</option>
                          <option value="Si">Si</option>
                          <option value="No">No</option>
                        </select>
                        {errors.renta && (
                          <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
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
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                              />
                            </svg>

                            <span className="text-sm">
                              {errors.renta.message}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end items-center gap-4 py-1 px-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-red-500 text-white text-sm py-1.5 px-4 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 text-white text-sm py-1.5 px-4 rounded"
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
