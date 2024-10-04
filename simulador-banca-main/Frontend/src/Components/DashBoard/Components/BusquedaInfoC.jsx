import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const BusquedaInfoC = ({ data }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Estado para guardar los datos iniciales
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    // Verifica si usuario tiene valores y accede al primer data
    if (data && data.length > 0) {
      const usuario = data[0];

      // Guarda los datos iniciales
      setInitialData({
        nombre: usuario.nombre || "",
        primer_apellido: usuario.primerapellido || "",
        segundo_apellido: usuario.segundoapellido || "",
        tipo_documento: usuario.tipodocumento || "",
        num_documento: usuario.ip_documento || "",
        lugar_expedicion: usuario.ciudadnacimiento || "",
        fecha_expedicion: usuario.fechaexpedicion
          ? new Date(usuario.fechaexpedicion).toISOString().split("T")[0]
          : "",
        fecha_nacimiento: usuario.fechanacimiento
          ? new Date(usuario.fechanacimiento).toISOString().split("T")[0]
          : "",
        ciudad_nacimiento: usuario.ciudadnacimiento || "",
        genero: usuario.gen || "",
        estado_civil: usuario.estadocivil || "",
        nacionalidad: usuario.nacionalidad || "",
        direccion_residencia: usuario.direccion || "",
        barrio: usuario.barrio || "",
        ciudad: usuario.ciudad || "",
        departamento: usuario.depa || "",
        pais: usuario.pais || "",
        telefono: usuario.telefono || "",
        celular: usuario.celular || "",
        correo_electronico: usuario.correo || "",
        profesion: usuario.profesion || "",
        ocupacion: usuario.ocupacion || "",
        actividad: usuario.actividad || "",
        ingresos_mensuales: usuario.ingresosmensuales || "",
        otros_ingresos: usuario.otrosingresos || "",
        renta: usuario.renta || "",
      });

      // Configura los valores del formulario
      setValue("nombre", usuario.nombre || "");
      setValue("primer_apellido", usuario.primerapellido || "");
      setValue("segundo_apellido", usuario.segundoapellido || "");
      setValue("tipo_documento", usuario.tipodocumento || "");
      setValue("num_documento", usuario.ip_documento || "");
      setValue("lugar_expedicion", usuario.ciudadnacimiento || "");
      setValue(
        "fecha_expedicion",
        usuario.fechaexpedicion
          ? new Date(usuario.fechaexpedicion).toISOString().split("T")[0]
          : ""
      );
      setValue(
        "fecha_nacimiento",
        usuario.fechanacimiento
          ? new Date(usuario.fechanacimiento).toISOString().split("T")[0]
          : ""
      );
      setValue("ciudad_nacimiento", usuario.ciudadnacimiento || "");
      setValue("genero", usuario.gen || "");
      setValue("estado_civil", usuario.estadocivil || "");
      setValue("nacionalidad", usuario.nacionalidad || "");
      setValue("direccion_residencia", usuario.direccion || "");
      setValue("barrio", usuario.barrio || "");
      setValue("ciudad", usuario.ciudad || "");
      setValue("departamento", usuario.depa || "");
      setValue("pais", usuario.pais || "");
      setValue("telefono", usuario.telefono || "");
      setValue("celular", usuario.celular || "");
      setValue("correo_electronico", usuario.correo || "");
      setValue("profesion", usuario.profesion || "");
      setValue("ocupacion", usuario.ocupacion || "");
      setValue("actividad", usuario.actividad || "");
      setValue("ingresos_mensuales", usuario.ingresosmensuales || "");
      setValue("otros_ingresos", usuario.otrosingresos || "");
      setValue("renta", usuario.renta || "");
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    // Compara los datos del formulario con los datos iniciales
    const isModified = JSON.stringify(formData) !== JSON.stringify(initialData);

    if (isModified) {
      try {
        const response = await fetch(
          `https://plataforma-bancaria.onrender.com/update_client/${data[0].id_cliente}`,
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
        setTimeout(() => {
          window.location = "/DashBoardMenu";
        }, 1500);
      } catch (error) {
        console.error("Error al actualizar el cliente", error);
      }
    } else {
      toast.info("No se han realizado cambios en el formulario.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="grid gap-5 lg:grid-cols-4">
            <div>
              <label className="block text-sm text-gray-500">
                Nombre Completo:
              </label>
              <input
                type="text"
                {...register("nombre", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/i,
                    message: "Solo se permiten letras y espacios",
                  },
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "El nombre no puede exceder los 40 caracteres",
                  },
                })}
                name="nombre"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.nombre
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
              />

              {errors.nombre && (
                <div className="flex justify-start items-center text-red-500 gap-1 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="inline w-5 h-5 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>

                  <p className="text-sm">{errors.nombre.message}</p>
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
                    value: /^[A-Za-z\s]+$/i,
                    message: "Solo se permiten letras y espacios",
                  },
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                  minLength: {
                    value: 3,
                    message: "El apellido debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "El apellido no puede exceder los 20 caracteres",
                  },
                })}
                name="primer_apellido"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.primer_apellido
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
              />

              {errors.primer_apellido && (
                <div className="flex justify-start items-center text-red-500 gap-1 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="inline w-5 h-5 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>

                  <p className="text-sm">{errors.segundo_apellido.message}</p>
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
                    value: /^[A-Za-z\s]+$/i,
                    message: "Solo se permiten letras y espacios",
                  },
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                  minLength: {
                    value: 3,
                    message: "El apellido debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "El apellido no puede exceder los 20 caracteres",
                  },
                })}
                name="segundo_apellido"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.segundo_apellido
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
              />

              {errors.segundo_apellido && (
                <div className="flex justify-start items-center text-red-500 gap-1 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="inline w-5 h-5 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>

                  <p className="text-sm">{errors.segundo_apellido.message}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="opciones" className="block text-sm text-gray-500">
                Tipo de documento:
              </label>
              <select
                id="opciones"
                {...register("tipo_documento", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                })}
                name="tipo_documento"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.tipo_documento
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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
                <div className="flex justify-start items-center text-red-500 gap-1 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="inline w-5 h-5 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>

                  <p className="text-sm">{errors.tipo_documento.message}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-500">
                N° de documento
              </label>
              <input
                type="text"
                {...register("num_documento", {
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: "Solo se permiten números.",
                  },
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                  minLength: {
                    value: 6,
                    message: "Este campo debe tener al menos 6 caracteres.",
                  },
                  maxLength: {
                    value: 10,
                    message: "Este campo no puede exceder los 10 caracteres.",
                  },
                })}
                name="num_documento"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.num_documento
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
              />

              {errors.num_documento && (
                <div className="flex justify-start items-center text-red-500 gap-1 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="inline w-5 h-5 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>

                  <p className="text-sm">{errors.num_documento.message}</p>
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
                    value: /^[A-Za-z\s]+$/i, // Permitir letras y espacios
                    message: "Solo se permiten letras y espacios.",
                  },
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                  minLength: {
                    value: 3,
                    message: "Este campo debe tener al menos 3 letras.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Este campo no puede exceder los 20 caracteres.",
                  },
                })}
                name="lugar_expedicion"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.lugar_expedicion
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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
                    message: "Este campo es obligatorio.",
                  },
                })}
                name="fecha_expedicion"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.fecha_expedicion
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
              />
              {errors.fecha_expedicion && (
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
                    {errors.fecha_expedicion.message}
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
                    message: "Este campo es obligatorio.",
                  },
                })}
                name="fecha_nacimiento"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.fecha_nacimiento
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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
                    value: /^[A-Za-z\s]+$/i,
                    message: "Digita solo letras y espacios.",
                  },
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                  minLength: {
                    value: 3,
                    message: "Este campo debe tener al menos 3 letras.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Este campo no puede exceder los 20 caracteres.",
                  },
                })}
                name="ciudad_nacimiento"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.ciudad_nacimiento
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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
              <label htmlFor="opciones" className="block text-sm text-gray-500">
                Género:
              </label>
              <select
                id="opciones"
                {...register("genero", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                })}
                name="genero"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.genero
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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

                  <span className="text-sm">{errors.genero.message}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="opciones" className="block text-sm text-gray-500">
                Estado Civil:
              </label>
              <select
                id="opciones"
                {...register("estado_civil", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                })}
                name="estado_civil"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.estado_civil
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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

                  <span className="text-sm">{errors.estado_civil.message}</span>
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
                    value: /^[A-Za-z\s]+$/i,
                    message: "Solo se permiten letras y espacios",
                  },
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                  minLength: {
                    value: 3,
                    message: "Este campo debe tener al menos 3 caracteres.",
                  },
                  maxLength: {
                    value: 15,
                    message: "Este campo no puede exceder los 15 caracteres.",
                  },
                })}
                name="nacionalidad"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.nacionalidad
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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

                  <span className="text-sm">{errors.nacionalidad.message}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-500">
                Dirección de residencia
              </label>
              <input
                type="text"
                {...register("direccion_residencia", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                  minLength: {
                    value: 3,
                    message: "Este campo debe tener al menos 3 caracteres.",
                  },
                  maxLength: {
                    value: 30,
                    message: "Este campo no puede exceder los 30 caracteres.",
                  },
                })}
                name="direccion_residencia"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.direccion_residencia
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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
              <label className="block text-sm text-gray-500">Barrio</label>
              <input
                type="text"
                {...register("barrio", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/i,
                    message: "Solo se permiten letras y espacios",
                  },
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                  minLength: {
                    value: 3,
                    message: "Este campo debe tener al menos 3 caracteres.",
                  },
                  maxLength: {
                    value: 15,
                    message: "Este campo no puede exceder los 15 caracteres.",
                  },
                })}
                name="barrio"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.barrio
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
              />
              {errors.barrio && (
                <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <span className="text-sm">{errors.barrio.message}</span>
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
                    value: /^[A-Za-z\s]+$/i,
                    message: "Solo se permiten letras y espacios",
                  },
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                  minLength: {
                    value: 3,
                    message: "Este campo debe tener al menos 3 caracteres.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Este campo no puede exceder los 20 caracteres.",
                  },
                })}
                name="ciudad"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.ciudad
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
              />
              {errors.ciudad && (
                <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <span className="text-sm">{errors.ciudad.message}</span>
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
                    message: "Solo se permiten letras y espacios",
                  },
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                  minLength: {
                    value: 3,
                    message: "Este campo debe tener al menos 3 caracteres.",
                  },
                  maxLength: {
                    value: 15,
                    message: "Este campo no puede exceder los 15 caracteres.",
                  },
                })}
                name="departamento"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.departamento
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
              />
              {errors.departamento && (
                <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <span className="text-sm">{errors.departamento.message}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-500">País</label>
              <input
                type="text"
                {...register("pais", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/i,
                    message: "Solo se permiten letras y espacios",
                  },
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                  minLength: {
                    value: 3,
                    message: "Este campo debe tener al menos 3 caracteres.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Este campo no puede exceder los 20 caracteres.",
                  },
                })}
                name="pais"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.pais
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
              />
              {errors.pais && (
                <div className="flex justify-start items-center text-red-500 gap-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <span className="text-sm">{errors.pais.message}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-500">Teléfono</label>
              <input
                type="number"
                {...register("telefono", {
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: "Solo se permiten números.",
                  },
                  minLength: {
                    value: 10,
                    message: "Este campo debe tener al menos 10 caracteres.",
                  },
                  maxLength: {
                    value: 13,
                    message: "Este campo no puede exceder los 13 caracteres.",
                  },
                })}
                name="telefono"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.telefono
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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

                  <span className="text-sm">{errors.telefono.message}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-500">Celular</label>
              <input
                type="number"
                {...register("celular", {
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: "Solo se permiten números.",
                  },
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                  minLength: {
                    value: 10,
                    message: "Este campo debe tener al menos 10 caracteres.",
                  },
                  maxLength: {
                    value: 13,
                    message: "Este campo no puede exceder los 13 caracteres.",
                  },
                })}
                name="celular"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.celular
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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

                  <span className="text-sm">{errors.celular.message}</span>
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
              <label className="block text-sm text-gray-500">Profesión</label>
              <input
                type="text"
                {...register("profesion", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/i,
                    message: "Solo se permiten letras y espacios",
                  },
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "El nombre no puede exceder los 50 caracteres",
                  },
                })}
                name="profesion"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.profesion
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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

                  <span className="text-sm">{errors.profesion.message}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="opciones" className="block text-sm text-gray-500">
                Ocupación/Oficio:
              </label>
              <select
                id="opciones"
                {...register("ocupacion", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                })}
                name="ocupacion"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.ocupacion
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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

                  <span className="text-sm">{errors.ocupacion.message}</span>
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
                    value: /^[A-Za-z\s]+$/i,
                    message: "Solo se permiten letras y espacios",
                  },
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 15,
                    message: "El nombre no puede exceder los 15 caracteres",
                  },
                })}
                name="actividad"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.actividad
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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

                  <span className="text-sm">{errors.actividad.message}</span>
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
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: "Solo se permiten números.",
                  },
                  minLength: {
                    value: 1,
                    message: "Este campo debe tener al menos 1 caracteres.",
                  },
                  maxLength: {
                    value: 8,
                    message: "Este campo no puede exceder los 8 caracteres.",
                  },
                })}
                name="ingresos_mensuales"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.ingresos_mensuales
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: "Solo se permiten números.",
                  },
                  minLength: {
                    value: 1,
                    message: "Este campo debe tener al menos 1 caracteres.",
                  },
                  maxLength: {
                    value: 8,
                    message: "Este campo no puede exceder los 8 caracteres.",
                  },
                })}
                name="otros_ingresos"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.otros_ingresos
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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
              <label htmlFor="opciones" className="block text-sm text-gray-500">
                ¿Es declarante de renta?:
              </label>
              <select
                id="opciones"
                {...register("renta", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio.",
                  },
                })}
                name="renta"
                className={`mt-2 block w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.renta
                    ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-300 dark:focus:border-emerald-300"
                }`}
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

                  <span className="text-sm">{errors.renta.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center">
          <button
            type="submit"
            className="flex justify-center items-center gap-x-2 bg-emerald-600 text-white text-sm py-2 px-4 rounded hover:"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.4}
              stroke="currentColor"
              className="w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>

            <p>Actualizar Información</p>
          </button>
        </div>
      </form>
    </>
  );
};
