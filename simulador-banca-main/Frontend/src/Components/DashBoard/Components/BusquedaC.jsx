import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import ModalMovimientoCliente from "./ModalMovimientoCliente";
import { toast } from "react-toastify";
import { BusquedaInfoC } from "./BusquedaInfoC";
import { dateFormatter } from "../../../utils/dateFormatter";
import { saldoFormatter } from "../../../utils/saldoFormatter";
import { ModalCreateAccount } from "./ModalCreateAccount";

export const BusquedaC = () => {
  const [dataUser, setDataUser] = useState([]);
  const [accounts, setAccounts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMovimientosModal, setShowMovimientosModal] = useState(false); // Estado para el modal de movimientos
  const [idDetails, setIdDetails] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://plataforma-bancaria.onrender.com/get_search"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataUser(data);
    } catch (error) {
      console.error("Error al encontrar información:", error);
    }
  };

  const fetchAccounts = async (id_cliente) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user_accounts/${id_cliente}`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok for ID ${id_cliente}`);
      }
      const data = await response.json();
      setAccounts((prevAccounts) => ({
        ...prevAccounts,
        [id_cliente]: data,
      }));
    } catch (error) {
      console.error(
        "Error al encontrar información de cuentas bancarias:",
        error
      );
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const handleModal = () => {
    setOpenModal(true);
  };

  // Filtrar cliente y sus cuentas según la búsqueda por documento.
  const filteredData =
    dataUser?.filter((item) => {
      const hasAccount = accounts[item.id_cliente]?.length > 0; // Verifica si el cliente tiene cuentas
      const isDocumentComplete = searchTerm.trim().length > 0; // Verifica que el término de búsqueda no esté vacío

      // Compara el documento solo si está completo y específico
      return (
        isDocumentComplete &&
        item?.ip_documento === searchTerm.trim() && // Comparación exacta del documento
        hasAccount
      );
    }) || [];

  const openMovimientos = (id_detalle) => {
    // const clienteDetails = dataUser.find(
    //   (data) => data.id_cliente === id_cliente
    // );

    const idDetalle = id_detalle;
    setIdDetails(idDetalle); // Establecer los detalles del cliente
    setShowMovimientosModal(true); // Abrir el modal de movimientos
  };

  useEffect(() => {
    // Agregar un retraso de 2 segundos antes de cargar los datos
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 2000); // 2000 milisegundos = 2 segundos

    // Limpiar el timeout si el componente se desmonta antes de que se complete el tiempo
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Cuando se cargan los usuarios, se obtienen sus cuentas
    dataUser.forEach((user) => {
      fetchAccounts(user.id_cliente);
    });
  }, [dataUser]);

  return (
    <>
      <section className="container p-4 mx-auto" style={{ minHeight: "87vh" }}>
        <div className="flex flex-col justify-center items-between gap-y-6 h-full">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col justify-center items-start">
              <div className="flex flex-row items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                  Gestion de Clientes
                </h2>
              </div>
              <p className="text-sm text-gray-500 m-0 p-0">
                Información y Productos bancarios.
              </p>
            </div>

            <div className="w-80">
              <div className="flex items-center">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mx-3 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Busqueda por documento"
                  className="w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5  focus:border-DarkSlate focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
          </div>

          {searchTerm === "" ? (
            <div className="border-t border-gray-300 text-gray-500 text-center py-5">
              Por favor, ingrese un término de búsqueda.
            </div>
          ) : filteredData.length === 0 ? (
            <div className="border-t border-gray-300 text-gray-500 text-center py-5">
              No se encontraron clientes.
            </div>
          ) : (
            <>
              <div className="border-y border-gray-300 py-5">
                <BusquedaInfoC data={filteredData} />
              </div>

              <div className="flex flex-col">
                <div>
                  <h1 className="text-lg font-medium text-gray-800 dark:text-white">
                    Productos Bancarios
                  </h1>
                </div>

                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-2">
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
                                  <span>N° Cuenta</span>
                                </button>
                              </div>
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                            >
                              <div className="flex justify-center items-center gap-x-3">
                                <button>
                                  <span>Tipo de cuenta</span>
                                </button>
                              </div>
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                            >
                              <div className="flex justify-center items-center gap-x-3">
                                <button>
                                  <span>Saldo</span>
                                </button>
                              </div>
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                            >
                              <div className="flex justify-center items-center gap-x-3">
                                <button>
                                  <span>Fecha Creación</span>
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
                          {filteredData.length === 0 ? (
                            <tr>
                              <td
                                colSpan="5"
                                className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 text-center"
                              >
                                <span>No se encontraron clientes.</span>
                              </td>
                            </tr>
                          ) : (
                            filteredData.map((client) => {
                              const clientAccounts =
                                accounts[client.id_cliente] || [];

                              const filterAccounts = clientAccounts.filter(
                                (acount) => acount.estado === "Autorizado"
                              );

                              return filterAccounts.map((account) => (
                                <React.Fragment key={account.num_cuenta}>
                                  <tr>
                                    <td className="px-4 py-4 text-sm font-medium text-black dark:text-gray-200 whitespace-nowrap">
                                      <div className="w-full inline-flex justify-center items-center gap-x-3">
                                        <span>{account.num_cuenta}</span>
                                      </div>
                                    </td>

                                    <td className="px-4 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                      <div className="w-full inline-flex justify-center items-center gap-x-3">
                                        <span>{account.descripcion}</span>
                                      </div>
                                    </td>

                                    <td className="px-4 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                      <div className="w-full inline-flex justify-center items-center gap-x-3">
                                        <span>
                                          {saldoFormatter(account.saldo)}
                                        </span>
                                      </div>
                                    </td>

                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                      <div className="w-full inline-flex justify-center items-center gap-x-3">
                                        <span>
                                          {dateFormatter(account.fecha)}
                                        </span>
                                      </div>
                                    </td>

                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                      <div className="w-full inline-flex justify-center items-center gap-x-3">
                                        <button
                                          onClick={() =>
                                            openMovimientos(account.id_detalle)
                                          }
                                          className="text-gray-500 transition-colors duration-200 hover:text-emerald-500 focus:outline-none"
                                        >
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
                                              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                </React.Fragment>
                              ));
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end items-center mt-4">
                  <button
                    className="flex justify-center items-center gap-x-2 bg-emerald-600 text-white text-sm py-2 px-4 rounded hover:"
                    onClick={() => handleModal()}
                  >
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
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>

                    <p>Agregar Producto</p>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <ModalMovimientoCliente
          openMovimientos={showMovimientosModal}
          setOpenMovimientos={setShowMovimientosModal}
          idDetails={idDetails}
          setIdDetails={setIdDetails}
        />
        <ModalCreateAccount
          data={filteredData[0]}
          user={user}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </section>
    </>
  );
};
