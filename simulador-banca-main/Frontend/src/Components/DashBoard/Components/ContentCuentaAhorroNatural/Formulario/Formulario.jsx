import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown } from "flowbite-react";
import { useAuth } from "../../../../../context/AuthContext";

export const Formulario = ({
  contenidoSeleccionado1,
  regresar,
  handleBotonClick,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();

  let id = user?.id_empleado;

  const [getform, setgetfrom] = useState({
    Nombre: "",
    Apellido1: "",
    Apellido2: "",
    opciones1: "",
    NDocumento: "",
    CiudadN: "",
    LugarE: "",
    FechaE: "",
    FechaN: "",
    opciones2: "",
    opciones3: "",
    Nacionalidad: "",
    // --------- contacto --------
    DireccionR: "",
    BloqueTorre: "",
    AptoCasa: "",
    Barrio: "",
    Municipio: "",
    Departamento: "",
    Pais: "",
    Telefono: "",
    Celular: "",
    CorreoE: "",
    // ------ economica --------------
    Profesion: "",
    opciones4: "",
    ActiEcoP: "",
    CodigoCIIU: "",
    NumeroEm: "",
    NombreEm: "",
    DireccionEm: "",
    BarrioEm: "",
    MunicipioEm: "",
    DepartamentoEm: "",
    PaisEm: "",
    TelefonoEm: "",
    Ext: "",
    CelularEm: "",
    CorreoEm: "",
    // ----- financiera -------
    IngresosM: "",
    OIngresosM: "",
    TotalAc: "",
    Totalpa: "",
    DetalleOIM: "",
    TotalIn: "",
    VentasA: "",
    FechaCV: "",
    // ------- Tributaria ---------
    opciones5: "",
    opciones6: "",
    opciones7: "",
    opciones8: "",
    NumeroT: "",
    PaisT: "",
    Idtributario: "",
    FondosP: "",
    PaisFondos: "",
    CiudadFondos: "",
    // ------ operaciones -------
    opciones9: "",
    opciones10: "",
    NombreEn: "",
    opciones11: "",
    NProducto: "",
    MontoMP: "",
    Moneda: "",
    CiudadOp: "",
    PaisOp: "",
  });

  const [salanamafa, setSalanamafa] = useState(null);

  const valorInput = (event) => {
    const { name, defaultValue, id } = event.target;
    setgetfrom({ ...getform, [name]: defaultValue });
    console.log(getform);
  };

  const [datainfo, setdatainfo] = useState();

  const OnsumitInfo = async (data) => {
    setdatainfo(data);
    console.log(data);
    handleBotonClick("contacto");
  };

  const OnsumitInfo2 = async (data) => {
    setdatainfo(data);
    console.log(data);
    handleBotonClick("economica");
  };

  const OnsumitInfo3 = async (data) => {
    setdatainfo(data);
    console.log(data);
    handleBotonClick("financiera");
  };

  const OnsumitInfo4 = async (data) => {
    setdatainfo(data);
    console.log(data);
    handleBotonClick("tributaria");
  };

  const OnsumitInfo5 = async (data) => {
    setdatainfo(data);
    console.log(data);
    handleBotonClick("operaciones");
  };

  const OnsumitInfo6 = async (data) => {
    setdatainfo(data); // Agregar el id_usuario al objeto datainfo
    console.log("datainfo:", datainfo);
    console.log("user?.id_empleado:", user?.id_empleado);
    CrearCliente(data);
  };

  const CrearCliente = async () => {
    const getClient = async (NDocumento) => {
      const response = await fetch(
        `http://localhost:3000/get_client/${NDocumento}`
      );
      if (response.status === 404) {
        // Cliente no encontrado, retornamos un valor que indica que no existe
        return null;
      }
      if (!response.ok) throw new Error("Error al obtener el cliente.");
      return response.json();
    };

    const registerClient = async (id, data) => {
      const response = await fetch(`http://localhost:3000/add_natural/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al registrar el cliente.");
      return response.json();
    };

    try {
      const data = await getClient(datainfo.NDocumento);

      if (!data) {
        // Cliente no existe, procede a registrar
        const responseData = await registerClient(id, datainfo);
        console.log(responseData);
        toast.success("Envío de formulario exitoso");

        setTimeout(() => {
          // Actualiza localmente el estado del cliente según sea necesario
          // Puedes utilizar la función setDatauser para actualizar el estado local
          // Ejemplo: setDatauser(prevData => [...prevData, data.updatedClient]);
          // alert('Autorización exitosa')
          // Redirige a la página '/DashBoardMenu' después de procesar la respuesta
          window.location = "/DashBoardMenu";
        }, 2000); // 2000 milisegundos = 2 segundos
      } else {
        // Cliente ya existe
        toast.error("El cliente ya se encuentra registrado.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Ocurrió un error durante el proceso.");
    }
  };

  return (
    <>
      {contenidoSeleccionado1 === "InfoPersonal" && (
        <form action="" onSubmit={handleSubmit(OnsumitInfo)}>
          <div className=" sm:ml-50">
            <div>
              <div
                className="flex gap-5 items-center justify-center flex-col "
                style={{ minHeight: "87vh" }}
              >
                <h1 className="w-2/4 text-black text-4xl flex items-center justify-center font-semibold text-center p-2 border-b-2 border-lightGreen">
                  Información personal
                </h1>
                <div
                  className="w-11/12  flex justify-center items-cente"
                  style={{ minHeight: "55vh" }}
                >
                  <div className="grid justify-center gap-5 p-5 lg:grid-cols-3">
                    <div>
                      <p>Nombre Completo:</p>
                      <input
                        type="text"
                        {...register("Nombre", {
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
                        name="Nombre"
                        defaultValue={getform.Nombre}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Nombre && (
                        <span className="text-red-600 flex items-end">
                          {errors.Nombre.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Primer Apellido</p>
                      <input
                        type="text"
                        {...register("Apellido1", {
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
                        name="Apellido1"
                        defaultValue={getform.Apellido1}
                        onChange={valorInput}
                        id={getform.Apellido1}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Apellido1 && (
                        <span className="text-red-600 flex items-end">
                          {errors.Apellido1.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <p>Segundo Apellido</p>
                      <input
                        type="text"
                        {...register("Apellido2", {
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
                        name="Apellido2"
                        defaultValue={getform.Apellido2}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Apellido2 && (
                        <span className="text-red-600 flex items-end">
                          {errors.Apellido2.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="opciones"
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      >
                        Tipo de documento:
                      </label>
                      <select
                        id="opciones"
                        {...register("opciones1", {
                          required: {
                            value: true,
                            message: "Campo requerido",
                          },
                        })}
                        name="opciones1"
                        defaultValue={getform.opciones1}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green w-52 p-2"
                      >
                        <option value="">Seleccionar</option>
                        <option value="CC">C.C.</option>
                        <option value="TI">T.I.</option>
                        <option value="RCivil">R. Civil</option>
                        <option value="CE">Cédula extranjería</option>
                        <option value="PP">Pasaporte</option>
                        <option value="CD">Carné diplomático</option>
                      </select>
                      {errors.opciones1 && (
                        <span className="text-red-600 flex items-end">
                          {errors.opciones1.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>N° de documento</p>
                      <input
                        type="number"
                        {...register("NDocumento", {
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
                        name="NDocumento"
                        defaultValue={getform.NDocumento}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.NDocumento && (
                        <span className="text-red-600 flex items-end">
                          {errors.NDocumento.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Ciudad de nacimiento</p>
                      <input
                        type="text"
                        {...register("CiudadN", {
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
                        name="CiudadN"
                        defaultValue={getform.CiudadN}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.CiudadN && (
                        <span className="text-red-600 flex items-end">
                          {errors.CiudadN.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Lugar de expedición</p>
                      <input
                        type="text"
                        {...register("LugarE", {
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
                        name="LugarE"
                        defaultValue={getform.LugarE}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.LugarE && (
                        <span className="text-red-600 flex items-end">
                          {errors.LugarE.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Fecha de expedición</p>
                      <input
                        type="date"
                        {...register("FechaE", {
                          required: {
                            value: true,
                            message: "Campo requerido",
                          },
                        })}
                        name="FechaE"
                        defaultValue={getform.FechaE}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green w-52"
                      />
                      {errors.FechaE && (
                        <span className="text-red-600 flex items-end">
                          {errors.FechaE.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Fecha de nacimiento</p>
                      <input
                        type="date"
                        {...register("FechaN", {
                          required: {
                            value: true,
                            message: "Campo requerido",
                          },
                        })}
                        name="FechaN"
                        defaultValue={getform.FechaN}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green w-52"
                      />
                      {errors.FechaN && (
                        <span className="text-red-600 flex items-end">
                          {errors.FechaN.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="opciones" className="mr-2">
                        Genero:
                      </label>
                      <select
                        id="opciones"
                        {...register("opciones2", {
                          required: {
                            value: true,
                            message: "Campo requerido",
                          },
                        })}
                        name="opciones2"
                        defaultValue={getform.opciones2}
                        onChange={valorInput}
                        className="p-2 rounded border-gray-300 focus:ring-green focus:border-green w-52"
                      >
                        <option value="">Seleccionar</option>
                        <option value="F">Femenino</option>
                        <option value="M">Masculino</option>
                      </select>
                      {errors.opciones2 && (
                        <span className="text-red-600 flex items-end">
                          {errors.opciones2.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="opciones" className="mr-2">
                        Estado Civil:
                      </label>
                      <select
                        id="opciones"
                        {...register("opciones3", {
                          required: {
                            value: true,
                            message: "Campo requerido",
                          },
                        })}
                        name="opciones3"
                        defaultValue={getform.opciones3}
                        onChange={valorInput}
                        className="p-2 rounded border-gray-300 focus:ring-green focus:border-green w-52"
                      >
                        <option value="">Seleccionar</option>
                        <option value="Soltero">Soltero</option>
                        <option value="Casado">Casado</option>
                        <option value="UL">Unión libre</option>
                      </select>
                      {errors.opciones3 && (
                        <span className="text-red-600 flex items-end">
                          {errors.opciones3.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Nacionalidad</p>
                      <input
                        type="text"
                        {...register("Nacionalidad", {
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
                        name="Nacionalidad"
                        defaultValue={getform.Nacionalidad}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Nacionalidad && (
                        <span className="text-red-600 flex items-end">
                          {errors.Nacionalidad.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid gap-5 lg:grid-cols-2 p-8">
                  <a
                    onClick={regresar}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    Menú Formulario
                  </a>
                  <button
                    type="submit"
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    Siguiente
                    <svg
                      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      {contenidoSeleccionado1 === "contacto" && (
        <form action="" onSubmit={handleSubmit(OnsumitInfo2)}>
          <div className="sm:ml-50">
            <div>
              <div
                className="flex gap-5 items-center justify-center flex-col"
                style={{ minHeight: "85vh" }}
              >
                <h1 className="w-2/4 text-black text-4xl flex items-center justify-center font-semibold text-center p-2 border-b-2 border-lightGreen">
                  Información de contacto personal
                </h1>
                <div
                  className="w-11/12  flex justify-center items-center"
                  style={{ minHeight: "55vh" }}
                >
                  <div className="grid justify-center gap-5 p-5 lg:grid-cols-3">
                    <div>
                      <p>Dirección residencia</p>
                      <input
                        type="text"
                        {...register("DireccionR", {
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
                        name="DireccionR"
                        defaultValue={getform.DireccionR}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.DireccionR && (
                        <span className="text-red-600 flex items-end">
                          {errors.DireccionR.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 ">
                      <label>Bloque/Torre</label>
                      <input
                        type="text"
                        {...register("BloqueTorre", {
                          minLength: {
                            value: 3,
                            message: "Minimo 3 letras",
                          },
                          maxLength: {
                            value: 15,
                            message: "Maximo 15 letras",
                          },
                        })}
                        name="BloqueTorre"
                        defaultValue={getform.BloqueTorre}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.BloqueTorre && (
                        <span className="text-red-600 flex items-end">
                          {errors.BloqueTorre.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Apto/Casa</p>
                      <input
                        type="text"
                        {...register("AptoCasa", {
                          minLength: {
                            value: 3,
                            message: "Minimo 3 letras",
                          },
                          maxLength: {
                            value: 15,
                            message: "Maximo 15 letras",
                          },
                        })}
                        name="AptoCasa"
                        defaultValue={getform.AptoCasa}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.AptoCasa && (
                        <span className="text-red-600 flex items-end">
                          {errors.AptoCasa.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Barrio</p>
                      <input
                        type="text"
                        {...register("Barrio", {
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
                        name="Barrio"
                        defaultValue={getform.Barrio}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Barrio && (
                        <span className="text-red-600 flex items-end">
                          {errors.Barrio.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Ciudad/Municipio</p>
                      <input
                        type="text"
                        {...register("Municipio", {
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
                        name="Municipio"
                        defaultValue={getform.Municipio}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Municipio && (
                        <span className="text-red-600 flex items-end">
                          {errors.Municipio.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Departamento</p>
                      <input
                        type="text"
                        {...register("Departamento", {
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
                        name="Departamento"
                        defaultValue={getform.Departamento}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Departamento && (
                        <span className="text-red-600 flex items-end">
                          {errors.Departamento.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>País</p>
                      <input
                        type="text"
                        {...register("Pais", {
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
                        name="Pais"
                        defaultValue={getform.Pais}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Pais && (
                        <span className="text-red-600 flex items-end">
                          {errors.Pais.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Teléfono</p>
                      <input
                        type="number"
                        {...register("Telefono", {
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
                        name="Telefono"
                        defaultValue={getform.Telefono}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Telefono && (
                        <span className="text-red-600 flex items-end">
                          {errors.Telefono.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Celular</p>
                      <input
                        type="number"
                        {...register("Celular", {
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
                        name="Celular"
                        defaultValue={getform.Celular}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Celular && (
                        <span className="text-red-600 flex items-end">
                          {errors.Celular.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Correo electrónico</p>
                      <input
                        type="email"
                        required
                        {...register("CorreoE")}
                        name="CorreoE"
                        defaultValue={getform.CorreoE}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green w-auto lg:w-72"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid gap-5 lg:grid-cols-3 p-8">
                  <a
                    onClick={regresar}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    Menú Formulario
                  </a>
                  <a
                    onClick={() => handleBotonClick("InfoPersonal")}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    <svg
                      className="w-3.5 h-3.5 me-2 rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                    Anterior
                  </a>
                  <button
                    type="submit"
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    Siguiente
                    <svg
                      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      {contenidoSeleccionado1 === "economica" && (
        <form action="" onSubmit={handleSubmit(OnsumitInfo3)}>
          <div className="sm:ml-50">
            <div>
              <div
                className="flex gap-5 items-center justify-center flex-col"
                style={{ minHeight: "85vh" }}
              >
                <h1 className="w-2/4 text-black text-4xl flex items-center justify-center font-semibold text-center p-2 border-b-2 border-lightGreen">
                  Información económica y laboral
                </h1>
                <div
                  className="w-11/12  flex justify-center items-center"
                  style={{ minHeight: "55vh" }}
                >
                  <div className="grid justify-center gap-5 p-5 lg:grid-cols-3">
                    <div className="flex flex-col w-52 justify-end">
                      <p>Profesión</p>
                      <input
                        type="text"
                        {...register("Profesion", {
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
                        name="Profesion"
                        defaultValue={getform.Profesion}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Profesion && (
                        <span className="text-red-600 flex items-end">
                          {errors.Profesion.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <label htmlFor="opciones">Ocupación/Oficio:</label>
                      <select
                        id="opciones"
                        {...register("opciones4", {
                          required: {
                            value: true,
                            message: "Campo requerido",
                          },
                        })}
                        defaultValue={getform.opciones4}
                        onChange={valorInput}
                        name="opciones4"
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
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
                      {errors.opciones4 && (
                        <span className="text-red-600 flex items-end">
                          {errors.opciones4.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col justify-end">
                      <p>Actividad económica principal</p>
                      <input
                        type="text"
                        {...register("ActiEcoP", {
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
                        name="ActiEcoP"
                        defaultValue={getform.ActiEcoP}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.ActiEcoP && (
                        <span className="text-red-600 flex items-end">
                          {errors.ActiEcoP.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <p>Código CIIU</p>
                      <input
                        type="number"
                        {...register("CodigoCIIU", {
                          minLength: {
                            value: 4,
                            message: "Minimo4 numeros",
                          },
                          maxLength: {
                            value: 7,
                            message: "Maximo 7 numeros",
                          },
                        })}
                        pattern="[0-9]*"
                        name="CodigoCIIU"
                        defaultValue={getform.CodigoCIIU}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.CodigoCIIU && (
                        <span className="text-red-600 flex items-end">
                          {errors.CodigoCIIU.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <p>N° Empleados</p>
                      <input
                        type="number"
                        {...register("NumeroEm", {
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
                        name="NumeroEm"
                        defaultValue={getform.NumeroEm}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.NumeroEm && (
                        <span className="text-red-600 flex items-end">
                          {errors.NumeroEm.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <p>Nombre de la empresa</p>
                      <input
                        type="text"
                        {...register("NombreEm", {
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
                        name="NombreEm"
                        defaultValue={getform.NombreEm}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.NombreEm && (
                        <span className="text-red-600 flex items-end">
                          {errors.NombreEm.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <p>
                        Dirección de empresa o lugar donde desarrolla su
                        actividad
                      </p>
                      <input
                        type="text"
                        {...register("DireccionEm", {
                          minLength: {
                            value: 3,
                            message: "Minimo 3 digitos",
                          },
                          maxLength: {
                            value: 30,
                            message: "Maximo 30 digitos",
                          },
                        })}
                        name="DireccionEm"
                        defaultValue={getform.DireccionEm}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.DireccionEm && (
                        <span className="text-red-600 flex items-end">
                          {errors.DireccionEm.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Barrio</p>
                      <input
                        type="text"
                        {...register("BarrioEm", {
                          pattern: {
                            value: /^[A-Za-z ]+$/i,
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
                        name="BarrioEm"
                        defaultValue={getform.BarrioEm}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.BarrioEm && (
                        <span className="text-red-600 flex items-end">
                          {errors.BarrioEm.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Ciudad/Municipio</p>
                      <input
                        type="text"
                        {...register("MunicipioEm", {
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
                        name="MunicipioEm"
                        defaultValue={getform.MunicipioEm}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.MunicipioEm && (
                        <span className="text-red-600 flex items-end">
                          {errors.MunicipioEm.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Departamento</p>
                      <input
                        type="text"
                        {...register("DepartamentoEm", {
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
                        name="DepartamentoEm"
                        defaultValue={getform.DepartamentoEm}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.DepartamentoEm && (
                        <span className="text-red-600 flex items-end">
                          {errors.DepartamentoEm.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>País</p>
                      <input
                        type="text"
                        {...register("PaisEm", {
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
                        name="PaisEm"
                        defaultValue={getform.PaisEm}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.PaisEm && (
                        <span className="text-red-600 flex items-end">
                          {errors.PaisEm.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Teléfono</p>
                      <input
                        type="number"
                        {...register("TelefonoEm", {
                          minLength: {
                            value: 3,
                            message: "Minimo 3 letras",
                          },
                          maxLength: {
                            value: 15,
                            message: "Maximo 15 letras",
                          },
                        })}
                        name="TelefonoEm"
                        defaultValue={getform.TelefonoEm}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.TelefonoEm && (
                        <span className="text-red-600 flex items-end">
                          {errors.Telefono.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Ext</p>
                      <input
                        type="number"
                        {...register("Ext", {
                          minLength: {
                            value: 2,
                            message: "Minimo 2 numeros ",
                          },
                          maxLength: {
                            value: 5,
                            message: "Maximo 5 numeros",
                          },
                        })}
                        name="Ext"
                        defaultValue={getform.Ext}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Ext && (
                        <span className="text-red-600 flex items-end">
                          {errors.Ext.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Celular</p>
                      <input
                        type="number"
                        {...register("CelularEm", {
                          minLength: {
                            value: 8,
                            message: "Minimo 8 numeros",
                          },
                          maxLength: {
                            value: 10,
                            message: "Maximo 10 numeros",
                          },
                        })}
                        pattern="[0-9]*"
                        name="CelularEm"
                        defaultValue={getform.CelularEm}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.CelularEm && (
                        <span className="text-red-600 flex items-end">
                          {errors.CelularEm.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Correo electrónico laboral</p>
                      <input
                        type="email"
                        {...register("CorreoEm")}
                        name="CorreoEm"
                        defaultValue={getform.CorreoEm}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid gap-5 lg:grid-cols-3 p-8">
                  <a
                    onClick={regresar}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    Menú Formulario
                  </a>
                  <a
                    onClick={() => handleBotonClick("contacto")}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    <svg
                      className="w-3.5 h-3.5 me-2 rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                    Anterior
                  </a>
                  <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black">
                    Siguiente
                    <svg
                      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      {contenidoSeleccionado1 === "financiera" && (
        <form action="" onSubmit={handleSubmit(OnsumitInfo4)}>
          <div className="sm:ml-50">
            <div>
              <div
                className="flex gap-5 items-center justify-center flex-col"
                style={{ minHeight: "85vh" }}
              >
                <h1 className="w-2/4 text-black text-4xl flex items-center justify-center font-semibold text-center p-2 border-b-2 border-lightGreen">
                  Detalle información financiera
                </h1>
                <div
                  className="w-11/12  flex justify-center items-center"
                  style={{ minHeight: "55vh" }}
                >
                  <div className="grid justify-center gap-5 p-5 lg:grid-cols-3">
                    <div>
                      <p>Ingresos mensuales</p>
                      <input
                        type="number"
                        {...register("IngresosM", {
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
                        name="IngresosM"
                        defaultValue={getform.IngresosM}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.IngresosM && (
                        <span className="text-red-600 flex items-end">
                          {errors.IngresosM.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Otros ingresos mensuales</p>
                      <input
                        type="number"
                        {...register("OIngresosM", {
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
                        name="OIngresosM"
                        defaultValue={getform.OIngresosM}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.OIngresosM && (
                        <span className="text-red-600 flex items-end">
                          {errors.OIngresosM.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Total activos</p>
                      <input
                        type="number"
                        {...register("TotalAc", {
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
                        name="TotalAc"
                        defaultValue={getform.TotalAc}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.TotalAc && (
                        <span className="text-red-600 flex items-end">
                          {errors.TotalAc.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Total pasivos</p>
                      <input
                        type="number"
                        {...register("Totalpa", {
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
                        name="Totalpa"
                        defaultValue={getform.Totalpa}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Totalpa && (
                        <span className="text-red-600 flex items-end">
                          {errors.Totalpa.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <Dropdown
                        label=" Detalle otros ingresos mensuales "
                        inline
                      >
                        <Dropdown.Item>
                          (diferentes a su actividad económica principal)
                        </Dropdown.Item>
                      </Dropdown>

                      <input
                        type="text"
                        {...register("DetalleOIM", {
                          pattern: {
                            value: /^[A-Za-z ]+$/i,
                            message: "Digita solo letras",
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
                        name="DetalleOIM"
                        defaultValue={getform.DetalleOIM}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.DetalleOIM && (
                        <span className="text-red-600 flex items-end">
                          {errors.DetalleOIM.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Total egresos mensuales</p>
                      <input
                        type="number"
                        {...register("TotalIn", {
                          minLength: {
                            value: 1,
                            message: "Minimo 1 numeros",
                          },
                          maxLength: {
                            value: 12,
                            message: "Maximo 12 numeros",
                          },
                        })}
                        pattern="[0-9]*"
                        name="TotalIn"
                        defaultValue={getform.TotalIn}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.TotalIn && (
                        <span className="text-red-600 flex items-end">
                          {errors.TotalIn.message}
                        </span>
                      )}
                    </div>
                    <div className=" flex flex-col w-36   ">
                      <div className=" flex-row- flex max-[1024px]:flex-col  max-[1024px]:justify-center  ">
                        <label
                          htmlFor=""
                          className="absolute text-sm flex flex-row max-[1024px]:xs w-72 min-[1324px]:w-80 max-[1024px]:flex-col "
                        >
                          {" "}
                          Si su ocupación es agricultor, comerciante,
                          independiente o ganadero, por favor diligencie la
                          siguiente información.
                        </label>
                      </div>
                      <br />
                      <br />
                      <br />
                      <div className="flex flex-row  gap-x-16 max-[1024px]:flex-col">
                        <div>
                          <p>Ventas anuales</p>
                          <input
                            type="number"
                            {...register("VentasA", {
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
                            name="VentasA"
                            defaultValue={getform.VentasA}
                            onChange={valorInput}
                            className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                          />
                          {errors.VentasA && (
                            <span className="text-red-600 flex items-end">
                              {errors.VentasA.message}
                            </span>
                          )}
                        </div>
                        <div>
                          <p>Fecha de cierre de ventas</p>
                          <input
                            type="date"
                            {...register("FechaCV")}
                            name="FechaCV"
                            defaultValue={getform.FechaCV}
                            onChange={valorInput}
                            className="rounded-md border-gray-300 focus:ring-green focus:border-green w-52"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-5 lg:grid-cols-3 p-8">
                  <a
                    onClick={regresar}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    Menú Formulario
                  </a>
                  <a
                    onClick={() => handleBotonClick("economica")}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    <svg
                      className="w-3.5 h-3.5 me-2 rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                    Anterior
                  </a>
                  <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black">
                    Siguiente
                    <svg
                      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      {contenidoSeleccionado1 === "tributaria" && (
        <form action="" onSubmit={handleSubmit(OnsumitInfo5)}>
          <div className="sm:ml-50">
            <div>
              <div
                className="flex gap-5 items-center justify-center flex-col"
                style={{ minHeight: "85vh" }}
              >
                <h1 className="w-2/4 text-black text-4xl flex items-center justify-center font-semibold text-center p-2 border-b-2 border-lightGreen">
                  Información Tributaria
                </h1>
                <div
                  className="w-11/12  flex justify-center items-center"
                  style={{ minHeight: "55vh" }}
                >
                  <div className="grid justify-center gap-5 p-5 lg:grid-cols-3">
                    <div className="flex flex-col">
                      <label htmlFor="opciones" className="mr-2">
                        ¿Es declarante de renta?:
                      </label>
                      <select
                        id="opciones"
                        {...register("opciones5", {
                          required: {
                            value: true,
                            message: "Campo requerido",
                          },
                        })}
                        defaultValue={getform.opciones5}
                        onChange={valorInput}
                        name="opciones5"
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green w-52 p-2"
                      >
                        <option value="">Seleccionar</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                      </select>
                      {errors.opciones5 && (
                        <span className="text-red-600 flex items-end">
                          {errors.opciones5.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="opciones" className="mr-2">
                        Agente retenedor:
                      </label>
                      <select
                        id="opciones"
                        {...register("opciones6", {
                          required: {
                            value: true,
                            message: "Campo requerido",
                          },
                        })}
                        defaultValue={getform.opciones6}
                        onChange={valorInput}
                        name="opciones6"
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green w-52 p-2"
                      >
                        <option value="">Seleccionar</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                      </select>
                      {errors.opciones6 && (
                        <span className="text-red-600 flex items-end">
                          {errors.opciones6.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="opciones" className="mr-2">
                        Régimen de IVA:
                      </label>
                      <select
                        id="opciones"
                        {...register("opciones7", {
                          required: {
                            value: true,
                            message: "Campo requerido",
                          },
                          maxLength: {
                            value: 20,
                            message: "option muy larga",
                          },
                        })}
                        defaultValue={getform.opciones7}
                        onChange={valorInput}
                        name="opciones7"
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green w-52 p-2"
                      >
                        <option value="">Seleccionar</option>
                        <option value="Comun">Común</option>
                        <option value="Simplificado">Simplificado</option>
                        <option value="Ninguno">Ninguno</option>
                      </select>
                      {errors.opciones7 && (
                        <span className="text-red-600 flex items-end">
                          {errors.opciones7.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <label htmlFor="opciones" className="mr-2">
                        Obligado a tributar en Estados Unidos:
                      </label>
                      <select
                        id="opciones"
                        {...register("opciones8")}
                        defaultValue={getform.opciones8}
                        onChange={valorInput}
                        name="opciones8"
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green w-52 p-2"
                      >
                        <option value="">Seleccionar</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <p>
                        *Si su respuesta es afirmativa indique el número de ID
                        tributario (TIN)
                      </p>
                      <input
                        type="number"
                        {...register("NumeroT", {
                          required: {
                            value: false,
                          },
                          minLength: {
                            value: 9,
                            message: "Minimo 9 numeros",
                          },
                          maxLength: {
                            value: 9,
                            message: "Maximo 9 numeros",
                          },
                        })}
                        pattern="[0-9]*"
                        name="NumeroT"
                        defaultValue={getform.NumeroT}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.NumeroT && (
                        <span className="text-red-600 flex items-end">
                          {errors.NumeroT.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <p>
                        Si está obligado a tributar en otro país diferente a
                        Colombia, indique cuál (es):
                      </p>
                      <input
                        type="text"
                        {...register("PaisT", {
                          minLength: {
                            value: 3,
                            message: "Minimo 3 letras",
                          },
                          maxLength: {
                            value: 20,
                            message: "Maximo 20 letras",
                          },
                        })}
                        name="PaisT"
                        defaultValue={getform.PaisT}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green "
                      />
                      {errors.PaisT && (
                        <span className="text-red-600 flex items-end">
                          {errors.PaisT.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <p>ID Tributario</p>
                      <input
                        type="text"
                        {...register("Idtributario", {
                          minLength: {
                            value: 9,
                            message: "Minimo 9 numeros",
                          },
                          maxLength: {
                            value: 9,
                            message: "Maximo 9 numeros",
                          },
                        })}
                        pattern="[0-9]*"
                        name="Idtributario"
                        defaultValue={getform.Idtributario}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Idtributario && (
                        <span className="text-red-600 flex items-end">
                          {errors.Idtributario.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <p>
                        Declaro que: El origen de mis bienes y/o fondos
                        provienen de:
                      </p>
                      <input
                        type="text"
                        {...register("FondosP", {
                          minLength: {
                            value: 3,
                            message: "Minimo 3 letras",
                          },
                          maxLength: {
                            value: 20,
                            message: "Maximo 20 letras",
                          },
                        })}
                        name="FondosP"
                        defaultValue={getform.FondosP}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.FondosP && (
                        <span className="text-red-600 flex items-end">
                          {errors.FondosP.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <p>El país origen de bienes y/o fondos</p>
                      <input
                        type="text"
                        {...register("PaisFondos", {
                          minLength: {
                            value: 3,
                            message: "Minimo 3 letras",
                          },
                          maxLength: {
                            value: 15,
                            message: "Maximo 15 letras",
                          },
                        })}
                        name="PaisFondos"
                        defaultValue={getform.PaisFondos}
                        onChange={valorInput}
                        placeholder=""
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.PaisFondos && (
                        <span className="text-red-600 flex items-end">
                          {errors.PaisFondos.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <p>La ciudad origen de bienes y/o fondos</p>
                      <input
                        type="text"
                        {...register("CiudadFondos", {
                          minLength: {
                            value: 3,
                            message: "Minimo 3 letras",
                          },
                          maxLength: {
                            value: 15,
                            message: "Maximo 15 letras",
                          },
                        })}
                        name="CiudadFondos"
                        defaultValue={getform.CiudadFondos}
                        onChange={valorInput}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.CiudadFondos && (
                        <span className="text-red-600 flex items-end">
                          {errors.CiudadFondos.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid gap-5 lg:grid-cols-3 p-8">
                  <a
                    onClick={regresar}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    Menú Formulario
                  </a>
                  <a
                    onClick={() => handleBotonClick("financiera")}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    <svg
                      className="w-3.5 h-3.5 me-2 rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                    Anterior
                  </a>
                  <button
                    type="submit"
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    Siguiente
                    <svg
                      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      {contenidoSeleccionado1 === "operaciones" && (
        <form action="" onSubmit={handleSubmit(OnsumitInfo6)}>
          <div className="sm:ml-50">
            <div>
              <div
                className="flex gap-5 items-center justify-center flex-col"
                style={{ minHeight: "85vh" }}
              >
                <h1 className="w-2/4 text-black text-4xl flex items-center justify-center font-semibold text-center p-2 border-b-2 border-lightGreen">
                  Información de operaciones internacionales
                </h1>
                <div
                  className="w-11/12  flex justify-center items-center"
                  style={{ minHeight: "55vh" }}
                >
                  <div className="grid justify-center gap-5 p-5 lg:grid-cols-3">
                    <div className="flex flex-col w-52 justify-end">
                      <label htmlFor="opciones">
                        ¿Realiza operaciones en moneda extranjera?:
                      </label>
                      <select
                        id="opciones"
                        {...register("opciones9", {
                          required: {
                            value: true,
                            message: "Campo requerido",
                          },
                        })}
                        defaultValue={getform.opciones9}
                        name="opciones9"
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green w-52 p-2"
                      >
                        <option value="">Seleccionar</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                      </select>
                      {errors.opciones9 && (
                        <span className="text-red-600 flex items-end">
                          {errors.opciones9.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <label htmlFor="opciones" className="mr-2 ">
                        ¿Cuál(es) de las siguientes operaciones realiza en
                        moneda extranjera?:
                      </label>
                      <select
                        id="opciones"
                        {...register("opciones10", {})}
                        defaultValue={getform.opciones10}
                        name="opciones10"
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green w-52 p-2"
                      >
                        <option value="">Seleccionar</option>
                        <option value="EI">Exportador e importador</option>
                        <option value="Exportador">Exportador</option>
                        <option value="Importador">Importador</option>
                        <option value="EGR">
                          Envío/Recepción de giros y remesas
                        </option>
                        <option value="PS">Pago de servicios</option>
                        <option value="Prestamos">Préstamos</option>
                        <option value="Inversiones">Inversiones</option>
                        <option value="otra">otra: </option>
                      </select>
                      {errors.opciones10 && (
                        <span className="text-red-600 flex items-end">
                          {errors.opciones10.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <p>Nombre de la entidad</p>
                      <input
                        type="text"
                        {...register("NombreEn", {
                          minLength: {
                            value: 3,
                            message: "Minimo 3 letras",
                          },
                          maxLength: {
                            value: 20,
                            message: "Maximo 20 letras",
                          },
                        })}
                        name="NombreEn"
                        defaultValue={getform.NombreEn}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.NombreEn && (
                        <span className="text-red-600 flex items-end">
                          {errors.NombreEn.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <label htmlFor="opciones" className="mr-2">
                        ¿Realiza operaciones en moneda extranjera?:
                      </label>
                      <select
                        id="opciones"
                        {...register("opciones11", {})}
                        defaultValue={getform.opciones11}
                        name="opciones11"
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green w-52 p-2"
                      >
                        <option value="">Seleccionar</option>
                        <option value="prestamos">Préstamos</option>
                        <option value="Inversiones">Inversiones</option>
                        <option value="Otra">otra</option>
                      </select>
                      {errors.opciones11 && (
                        <span className="text-red-600 flex items-end">
                          {errors.opciones11.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col w-52 justify-end">
                      <p>N° de producto</p>
                      <input
                        type="number"
                        {...register("NProducto", {
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
                        name="NProducto"
                        defaultValue={getform.NProducto}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.NProducto && (
                        <span className="text-red-600 flex items-end">
                          {errors.NProducto.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-52 justify-end">
                      <p>Monto mensual promedio</p>
                      <input
                        type="number"
                        {...register("MontoMP", {
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
                        name="MontoMP"
                        defaultValue={getform.MontoMP}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.MontoMP && (
                        <span className="text-red-600 flex items-end">
                          {errors.MontoMP.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Moneda</p>
                      <input
                        type="text"
                        {...register("Moneda", {
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Digita solo letras",
                          },
                          minLength: {
                            value: 1,
                            message: "Minimo 1 letras",
                          },
                          maxLength: {
                            value: 15,
                            message: "Maximo 15 letras",
                          },
                        })}
                        name="Moneda"
                        defaultValue={getform.Moneda}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.Moneda && (
                        <span className="text-red-600 flex items-end">
                          {errors.Moneda.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>Ciudad</p>
                      <input
                        type="text"
                        {...register("CiudadOp", {
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Digita solo letras",
                          },
                          minLength: {
                            value: 1,
                            message: "Minimo 1 letras",
                          },
                          maxLength: {
                            value: 20,
                            message: "Maximo 20 letras",
                          },
                        })}
                        name="CiudadOp"
                        defaultValue={getform.CiudadOp}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.CiudadOp && (
                        <span className="text-red-600 flex items-end">
                          {errors.CiudadOp.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>País</p>
                      <input
                        type="text"
                        {...register("PaisOp", {
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Digita solo letras",
                          },
                          minLength: {
                            value: 1,
                            message: "Minimo 1 letras",
                          },
                          maxLength: {
                            value: 20,
                            message: "Maximo 20 letras",
                          },
                        })}
                        name="PaisOp"
                        defaultValue={getform.PaisOp}
                        className="rounded-md border-gray-300 focus:ring-green focus:border-green"
                      />
                      {errors.PaisOp && (
                        <span className="text-red-600 flex items-end">
                          {errors.PaisOp.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid gap-5 lg:grid-cols-3 p-8">
                  <a
                    onClick={regresar}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    Menú Formulario
                  </a>
                  <a
                    onClick={() => handleBotonClick("tributaria")}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    <svg
                      className="w-3.5 h-3.5 me-2 rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                    Anterior
                  </a>
                  <button
                    type="submit"
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-gray-300 rounded-lg hover:bg-lightGreen shadow-md hover:text-black"
                  >
                    Finalizar Formulario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
