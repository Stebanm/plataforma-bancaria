import React, { useEffect, useState } from "react";
import userProfile from "../../../../assets/Img/Login/user.png";
import ModalInfoCajeros from "../ModalInfoCajeros";

export const MovimientosCajeros = () => {
  const [movCajeros, setMoviCajeros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalcajero, setModalCajero] = useState(null);

  const fetchCajeros = async () => {
    try {
      const response = await fetch("http://localhost:3000/get_users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const cajero = await response.json();
      const roles = [3, 4]; // Roles filtrados

      const filterCajeros = cajero.filter((cajero) =>
        roles.includes(cajero.id_rol)
      );
      setMoviCajeros(filterCajeros);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchCajeros();
  }, []); // Dependencia vacía para que solo se ejecute al montar

  useEffect(() => {
    if (modalcajero) {
      setShowModal(true);
    }
  }, [modalcajero]);

  const openModal = (cajero) => {
    setModalCajero(cajero);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalCajero(null);
  };

  const formatSaldo = (saldo) => {
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
    return formatter.format(saldo);
  };

  return (
    <>
      <section className="container p-4 mx-auto" style={{ minHeight: "87vh" }}>
        <div className="flex flex-col justify-center items-between h-full">
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
                              <span>ID Cajero</span>
                            </button>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                        >
                          <div className="flex justify-center items-center gap-x-3">
                            <button>
                              <span>Nombre</span>
                            </button>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                        >
                          <div className="flex justify-center items-center gap-x-2">
                            <button>
                              <span>Saldo</span>
                            </button>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400"
                        >
                          <div className="flex justify-center items-center gap-x-2">
                            <button>
                              <span>Estado</span>
                            </button>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {movCajeros.map((cajero) => (
                        <React.Fragment key={cajero.id_empleado}>
                          <tr>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span># {cajero.id_empleado}</span>
                              </div>
                            </td>
                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <div className="flex justify-start w-40">
                                  <div className="flex items-center gap-x-2">
                                    <img
                                      className="object-cover w-10 h-10 rounded-full"
                                      // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                      src={userProfile}
                                      alt=""
                                    />
                                    <div>
                                      <h2 className="font-medium text-gray-800 dark:text-white">
                                        {cajero.username}
                                      </h2>
                                      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        {cajero.id_rol === 3 && <>Cajero</>}
                                        {cajero.id_rol === 4 && (
                                          <>Cajero Principal</>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>{formatSaldo(cajero.saldo)}</span>
                              </div>
                            </td>

                            <td className="flex justify-center px-5 py-5 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                <h2 className="text-sm font-normal text-emerald-500">
                                  Activo
                                </h2>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {modalcajero && (
          <ModalInfoCajeros
            showModal={showModal}
            closeModal={closeModal}
            cajero={modalcajero}
          />
        )}
      </section>
    </>
  );
};

export default MovimientosCajeros;
