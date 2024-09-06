import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination } from "../../../Pagination/Pagination";

export const Cancelación = () => {
    const [datauser, setdatauser] = useState([]);

    const [allMovimientos, setAllMovimientos] = useState([]);
    const [movementsPage, setMovementsPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await fetch("http://localhost:3000/authorized");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setdatauser(data.result.rows);
                setAllMovimientos(data.result.rows);
            } catch (error) {
                console.error("error al encontrar informacion");
            }
        };
        fecthData();
    }, []);

    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const handleFechaInicioChange = (event) => {
        const inputDate = event.target.value;
        if (inputDate) {
            const [year, month, day] = inputDate.split("-");
            const fechaSeleccionada = `${year}-${month.padStart(
                2,
                "0"
            )}-${day.padStart(2, "0")}`;
            setFechaInicio(fechaSeleccionada);
        } else {
            setFechaInicio("");
        }
    };

    const handleFechaFinChange = (event) => {
        const inputDate = event.target.value;
        if (inputDate) {
            const [year, month, day] = inputDate.split("-");
            const fechaSeleccionada = `${year}-${month.padStart(
                2,
                "0"
            )}-${day.padStart(2, "0")}`;
            setFechaFin(fechaSeleccionada);
        } else {
            setFechaFin("");
        }
    };

    const dataFiltrados = datauser.filter((data) => {
        const fechaData = new Date(data.fecha).getTime();
        const fechaInicioTime = fechaInicio ? new Date(fechaInicio).getTime() : 0;
        const fechaFinTime = fechaFin
            ? new Date(fechaFin).getTime()
            : Number.MAX_SAFE_INTEGER;

        const fechaMatch =
            fechaData >= fechaInicioTime && fechaData <= fechaFinTime;
        return fechaMatch;
    });

    console.log(dataFiltrados);

    function mostrarFechaEnFormato(fecha) {
        // Crear un objeto Date con la fecha recibida
        const fechaObjeto = new Date(fecha);

        // Extraer el año, mes y día de la fecha
        const year = fechaObjeto.getFullYear();
        const month = fechaObjeto.getMonth() + 1; // Los meses van de 0 a 11, por lo que sumamos 1
        const day = fechaObjeto.getDate();

        // Formatear el mes y el día como cadenas de dos dígitos
        const monthString = month < 10 ? "0" + month : month.toString();
        const dayString = day < 10 ? "0" + day : day.toString();

        // Construir la cadena de fecha en el formato deseado: "yyyy-mm-dd"
        const fechaFormateada = `${dayString}-${monthString}-${year}`;

        return fechaFormateada;
    }

    // Ejemplo de uso
    const fechaOriginal = "2024-03-14T05:00:00.000Z";
    const fechaFormateada = mostrarFechaEnFormato(fechaOriginal);

    const movementsTotal = allMovimientos.length;

    // Función para formatear la fecha en "dd/mm/yyyy hh:mm:ss a.m./p.m.".
    const formatFecha = (fecha) => {
        const date = new Date(fecha);

        const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        };

        return new Intl.DateTimeFormat("es-CO", options).format(date);
    };

    const lastIndex = currentPage * movementsPage;
    const firstIndex = lastIndex - movementsPage;

    return (
        <section>
            <div
                className="container p-4 mx-auto flex flex-col"
                style={{ minHeight: "87vh" }}
            >
                <div className="flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between sm:items-start">
                    <div className="flex flex-col justify-center items-start">
                        <div className="flex flex-row items-center gap-x-3">
                            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                Historial de cuentas autorizadas
                            </h2>
                            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                                {movementsTotal} cuentas autorizadas
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 m-0 p-0">
                            Cuentas que han sido oficialmente autorizadas
                        </p>
                    </div>

                    <div className="flex flex-row justify-center items-center gap-x-2 max-[1024px]:flex-col max-[1024px]:justify-center max-[1024px]:items-center">
                        <input
                            type="date"
                            className="rounded-md border-gray-300 focus:ring-green focus:border-green w-48 "
                            defaultValue={fechaInicio}
                            onChange={handleFechaInicioChange}
                        />
                        <input
                            type="date"
                            className="rounded-md border-gray-300 focus:ring-green focus:border-green w-48"
                            defaultValue={fechaFin}
                            onChange={handleFechaFinChange}
                        />
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
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                                                >
                                                    <div className="flex justify-center items-center gap-x-3">
                                                        <button>
                                                            <span>Número de Documento</span>
                                                        </button>
                                                    </div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                                                >
                                                    <div className="flex justify-center items-center gap-x-3">
                                                        <button>
                                                            <span>Nombre del Cliente</span>
                                                        </button>
                                                    </div>
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                                                >
                                                    <div className="flex justify-center items-center gap-x-2">
                                                        <button>
                                                            <span>Número de Cuenta</span>
                                                        </button>
                                                    </div>
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                                                >
                                                    <div className="flex justify-center items-center gap-x-2">
                                                        <button>
                                                            <span>Producto Bancario</span>
                                                        </button>
                                                    </div>
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                                                >
                                                    <div className="flex justify-center items-center gap-x-2">
                                                        <button>
                                                            <span>Fecha</span>
                                                        </button>
                                                    </div>
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                                                >
                                                    <div className="flex justify-center items-center gap-x-2">
                                                        <button>
                                                            <span>Acción</span>
                                                        </button>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                            {dataFiltrados
                                                ?.map((data) => (
                                                    <React.Fragment key={data.id_detalle}>
                                                        <tr>
                                                            <td className="px-12 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                                                <div class="flex flex-col justify-center items-center gap-x-2">
                                                                    {data.ip_documento}
                                                                </div>
                                                            </td>

                                                            <td className="px-12 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                                                                <div className="w-full inline-flex justify-center items-center gap-x-3">
                                                                    {data.nombre}
                                                                </div>
                                                            </td>

                                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                                                                <div className="w-full inline-flex justify-center items-center gap-x-3">
                                                                    {data.num_cuenta}
                                                                </div>
                                                            </td>

                                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                                                                <div className="w-full inline-flex justify-center items-center gap-x-3">
                                                                    {data.descripcion}
                                                                </div>
                                                            </td>

                                                            <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                                <div className="w-full inline-flex justify-center items-center gap-x-3">
                                                                    {formatFecha(data.fecha)}
                                                                </div>
                                                            </td>

                                                            <td className="px-6 py-4 text-sm font-medium text-red-700 dark:text-red-200 whitespace-nowrap">
                                                                <button className="w-full inline-flex justify-center items-center gap-x-3">
                                                                    <div className="flex justify-center items-center px-3 py-1 rounded-full gap-x-2 bg-red-100 dark:bg-gray-800">
                                                                        <span className="text-red-500">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                                            </svg>
                                                                        </span>
                                                                        <h2 className="text-sm font-normal text-red-500">
                                                                            Cancelar cuenta
                                                                        </h2>
                                                                    </div>
                                                                </button>
                                                            </td>

                                                        </tr>
                                                    </React.Fragment>
                                                ))
                                                .slice(firstIndex, lastIndex)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Pagination
                        movementsPage={movementsPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        movementsTotal={movementsTotal}
                    />
                </div>
            </div>
        </section>
    );
};
