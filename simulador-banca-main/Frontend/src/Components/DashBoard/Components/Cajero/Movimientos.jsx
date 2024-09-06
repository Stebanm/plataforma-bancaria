import "react-toastify/dist/ReactToastify.css";
import React from "react";
import bank from "../../../../assets/Img/UsoVario/bank-cajero.png";

import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../context/AuthContext";

export const Movimientos = () => {
  //General Status
  const [dataUser, setDataUser] = useState();
  const [idEmpleadoDetails, setIdEmpleadoDetails] = useState("");
  const [empleadoDetails, setEmpleadoDetails] = useState("");
  const [bovedaDetails, setBovedaDetails] = useState("");

  //Disable Modales
  const [accountNumber, setAccountNumber] = useState("");
  const [accountOwner, setAccountOwner] = useState("");
  const [amount, setAmount] = useState("");
  const [isAccountNumberFilled, setIsAccountNumberFilled] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  // Abrir Modal
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);

  const [openModal1, setOpenModal1] = useState(false);
  const [email1, setEmail1] = useState("");

  //Login, user context
  const { user } = useAuth();


  // Funcion para traer un empleado por id.
  const fetchEmpleadoId = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/get_users/${user.id_empleado}`
      );
      if (response.ok) {
        const userData = await response.json();
        setIdEmpleadoDetails(userData);
      } else {
        console.error("Error fetching user info:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // funcion para traer todos los empleados.
  const fetchEmpleados = async () => {
    try {
      const response = await fetch("http://localhost:3000/get_users");
      if (response.ok) {
        const data = await response.json();
        setEmpleadoDetails(data);
      } else {
        console.error("Error fetching user info:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEmpleados();
      fetchEmpleadoId();
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  // Funciones Consignar -----------------------------------------------------------------------------------------------------------------------------
  const handleAccountNumberChange = (event) => {
    const value = event.target.value;
    setAccountNumber(value);
    setIsAccountNumberFilled(value.trim() !== "");
    setIsFormDisabled(value.trim() === "");
  };

  const handleConsultClick = async () => {
    try {
      const accountNumberInt = parseInt(accountNumber, 10);

      // Realizar la consulta a la base de datos utilizando el número de cuenta convertido
      const response = await fetch(
        `http://localhost:3000/get_account/${accountNumberInt}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Verificar si se encontraron datos
      if (data) {
        const { primernombre, primerapellido, segundoapellido } = data;

        const ownerName = `${primernombre} ${primerapellido} ${segundoapellido}`;
        setAccountOwner(ownerName);
        setIsFormDisabled(false);
        setDataUser(data);
      } else {
        console.log(
          "No se encontraron datos para el número de cuenta proporcionado."
        );

        // Puedes establecer un mensaje de error o realizar otras acciones según sea necesario
      }
    } catch (error) {
      console.error("Error al consultar la base de datos:", error);
      toast.error("Error: Número de cuenta no encontrado.");
      // Puedes establecer un mensaje de error o realizar otras acciones según sea necesario
    }
  };

  const handleConsign = async () => {
    const id = dataUser.id_detalle;
    const { saldo, estado } = dataUser;

    const idEmpleado = idEmpleadoDetails.id_empleado;
    const saldoEmpleado = idEmpleadoDetails.saldo;

    const newBalanceClient = parseFloat(amount) + parseFloat(saldo);
    const newBalanceEmploye = parseFloat(saldoEmpleado) + parseFloat(amount);

    // Verificar que la cuenta este autorizada y que el saldo no sea menor o igual a cero
    if (estado === "Denegado") {
      toast.error("Error: Esta cuenta ha sido rechazada por un Director.");
    } else if (estado === "Pendiente") {
      toast.error("Error: Esta cuenta no ha sido autorizada por un Director.");
      // } else if (parseFloat(amount) > saldoEmpleado) {
      //   toast.error("Error: No tienes saldo suficiente para esta consignación.");
    } else if (parseFloat(amount) <= 0) {
      toast.error("Error: El saldo a consignar no puede ser 0 o menor a 0.");
    } else {
      try {
        // Realiza una solicitud al servidor para cambiar el estado del cliente con el ID proporcionado
        const responseClient = await fetch(
          `http://localhost:3000/update_balance/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nuevoSaldo: newBalanceClient,
            }),
          }
        );
        if (!responseClient.ok) {
          throw new Error("Network response was not ok");
        }

        const responseEmploye = await fetch(
          `http://localhost:3000/balance_request/${idEmpleado}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nuevoSaldo: newBalanceEmploye,
              newStatus: "Activo",
              saldoSolicitado: 0,
            }),
          }
        );

        if (!responseEmploye.ok) {
          throw new Error("Network response was not ok");
        }

        const responseMovimiento = await fetch(
          `http://localhost:3000/post_movimiento`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              idEmpleado: idEmpleado,
              saldo: amount,
              tipoMovimiento: 1,
            }),
          }
        );

        if (!responseMovimiento.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await responseClient.json();
        console.log(data.message);
        toast.success("Saldo consignado correctamente.");

        setTimeout(() => {
          // Actualiza localmente el estado del cliente según sea necesario
          // Puedes utilizar la función setDatauser para actualizar el estado local
          // Ejemplo: setDatauser(prevData => [...prevData, data.updatedClient]);
          // alert('Autorización exitosa')
          // Redirige a la página '/DashBoardMenu' después de procesar la respuesta
          window.location = "/DashBoardMenu";
        }, 1500); // 2000 milisegundos = 2 segundos
      } catch (error) {
        console.error("Error general:", error);
      }
    }
  };

  function onCloseModal2() {
    setOpenModal2(false);
  }

  // Modal retirar -----------------------------------------------------------------------------------------------------------------------------------------

  function onCloseModal1() {
    setOpenModal1(false);
    setEmail1("");
  }

  //Funciones Modal Retirar
  const handleAccountNumberChangeRetirar = async () => {
    const value = event.target.value;
    setAccountNumber(value);
    setIsAccountNumberFilled(value.trim() !== "");
    setIsFormDisabled(value.trim() === "");
  };

  const handleConsultClickRetirar = async () => {
    try {
      const accountNumberInt = parseInt(accountNumber, 10);

      // Realizar la consulta a la base de datos utilizando el número de cuenta convertido
      const response = await fetch(
        `http://localhost:3000/get_account/${accountNumberInt}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Verificar si se encontraron datos
      if (data) {
        const { primernombre, primerapellido, segundoapellido } = data;
        const ownerName = `${primernombre} ${primerapellido} ${segundoapellido}`;
        setAccountOwner(ownerName);
        setIsFormDisabled(false);
        setDataUser(data);
        console.log(data);
      } else {
        console.log(
          "No se encontraron datos para el número de cuenta proporcionado."
        );
        // Puedes establecer un mensaje de error o realizar otras acciones según sea necesario
      }
    } catch (error) {
      console.error("Error al consultar la base de datos:", error);
      toast.error("Error: Número de cuenta no encontrado.");
      // Puedes establecer un mensaje de error o realizar otras acciones según sea necesario
    }
  };

  const handleRetirar = async () => {
    const id = dataUser.id_detalle;
    const { saldo, estado } = dataUser;

    const idEmpleado = idEmpleadoDetails.id_empleado;
    const saldoEmpleado = idEmpleadoDetails.saldo;

    const newBalanceClient = parseFloat(saldo) - parseFloat(amount);
    const newBalanceEmploye = parseFloat(saldoEmpleado) - parseFloat(amount);

    // Verificar que la cuenta este autorizada y que el saldo no sea menor o igual a cero
    if (estado === "Denegado") {
      toast.error("Error: Esta cuenta ha sido rechazada por un Director.");
    } else if (estado === "Pendiente") {
      toast.error("Error: Esta cuenta no ha sido autorizada por un Director.");
    } else if (parseFloat(amount) > saldo) {
      toast.error("Error: Esta cuenta no tiene saldo suficiente.");
    } else if (parseFloat(amount) <= 0) {
      toast.error("Error: El saldo a retirar no puede ser 0 o menor a 0.");
    } else {
      try {
        // Realiza una solicitud al servidor para actualizar el saldo del cliente
        const responseClient = await fetch(
          `http://localhost:3000/update_balance/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nuevoSaldo: newBalanceClient,
            }),
          }
        );

        if (!responseClient.ok) {
          throw new Error(
            "Network response was not ok al actualizar el saldo del cliente"
          );
        }

        // Realiza una solicitud al servidor para actualizar el saldo del empleado
        const responseEmploye = await fetch(
          `http://localhost:3000/balance_request/${idEmpleado}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nuevoSaldo: newBalanceEmploye,
              newStatus: "Activo",
              saldoSolicitado: 0,
            }),
          }
        );

        if (!responseEmploye.ok) {
          throw new Error(
            "Network response was not ok al actualizar el saldo del empleado"
          );
        }

        const responseMovimiento = await fetch(
          `http://localhost:3000/post_movimiento`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              idEmpleado: idEmpleado,
              saldo: amount,
              tipoMovimiento: 2,
            }),
          }
        );

        if (!responseMovimiento.ok) {
          throw new Error("Network response was not ok");
        }

        toast.success("Saldo retirado y actualizado correctamente.");

        setTimeout(() => {
          // Actualiza localmente el estado del cliente según sea necesario
          // Puedes utilizar la función setDatauser para actualizar el estado local
          // Ejemplo: setDatauser(prevData => [...prevData, data.updatedClient]);
          // alert('Autorización exitosa')
          // Redirige a la página '/DashBoardMenu' después de procesar la respuesta
          window.location = "/DashBoardMenu";
        }, 1500);
      } catch (error) {
        console.error("Error general:", error);
        toast.error("Error al realizar la operación.");
      }
    }
  };

  // Actualiza estado al momento de solicitar saldo
  const handleSolicitarSaldo = async () => {
    const idEmpleado = idEmpleadoDetails.id_empleado;

    try {
      const response = await fetch(
        `http://localhost:3000/balance_request/${idEmpleado}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newStatus: "Solicitud",
            saldoSolicitado: amount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.success(data.message);

      setTimeout(() => {
        window.location = "/DashBoardMenu";
      }, 1500);
    } catch (error) {
      console.error("Error al solicitar el saldo:", error);
      toast.error("Error al solicitar el saldo.");
    }
  };

  // Cancelar la solicitud de saldo.
  const handleCancelarSolicitud = async () => {
    const idEmpleado = idEmpleadoDetails.id_empleado;

    try {
      const response = await fetch(
        `http://localhost:3000/balance_request/${idEmpleado}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newStatus: "Activo",
            saldoSolicitado: 0,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.success(data.message);

      setTimeout(() => {
        window.location = "/DashBoardMenu";
      }, 1500);
    } catch (error) {
      console.error("Error al cancelar la solicitud:", error);
      toast.error("Error al cancelar la solicitud.");
    }
  };

  // Funcion para devolver saldo total del cajero al cajero principal
  const handleDevolverSaldo = async () => {
    // Filtra el empleado con rol de cajero principal
    const filterEmpleadoPrincipal = empleadoDetails.filter(
      (users) => users.id_rol === 4
    );

    const idEmpleado = idEmpleadoDetails.id_empleado;
    const saldoEmpleado = parseFloat(idEmpleadoDetails.saldo);
    const idPrincipal = filterEmpleadoPrincipal[0].id_empleado;
    const saldoPrincipal = parseFloat(filterEmpleadoPrincipal[0].saldo);

    // Convertir el monto ingresado a un número flotante
    const amountToReturn = parseFloat(amount);

    // Validaciones
    if (isNaN(amountToReturn) || amountToReturn <= 0) {
      return toast.error("Por favor, ingrese un monto válido.");
    }

    if (amountToReturn > saldoEmpleado) {
      return toast.error(
        "No tienes suficiente saldo para devolver esa cantidad."
      );
    }

    const newSaldoEmpleado = saldoEmpleado - amountToReturn;
    const newSaldoPrincipal = saldoPrincipal + amountToReturn;

    try {
      // Actualiza el saldo del cajero
      const responseCajero = await fetch(
        `http://localhost:3000/balance_request/${idEmpleado}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newStatus: "Activo",
            nuevoSaldo: newSaldoEmpleado,
            saldoSolicitado: 0,
          }),
        }
      );

      if (!responseCajero.ok) {
        throw new Error(
          "Network response was not ok al actualizar el saldo del cajero"
        );
      }

      // Actualiza el saldo del cajero principal (bóveda)
      const responsePrincipal = await fetch(
        `http://localhost:3000/balance_request/${idPrincipal}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newStatus: "Activo",
            nuevoSaldo: newSaldoPrincipal,
            saldoSolicitado: 0,
          }),
        }
      );

      if (!responsePrincipal.ok) {
        throw new Error(
          "Network response was not ok al actualizar el saldo del cajero principal"
        );
      }

      // Registrar el movimiento en el historial
      const responseMovimiento = await fetch(
        `http://localhost:3000/post_devolver/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idEmpleado: idEmpleado,
            saldo: amountToReturn,
            tipoMovimiento: 5,
            empleadoConsing: idPrincipal,
          }),
        }
      );

      if (!responseMovimiento.ok) {
        throw new Error(
          "Network response was not ok al registrar el movimiento"
        );
      }

      toast.success("Saldo devuelto y actualizado correctamente.");

      setTimeout(() => {
        window.location = "/DashBoardMenu";
      }, 1500);
    } catch (error) {
      console.error("Error al devolver el saldo:", error);
      toast.error("Error al devolver el saldo.");
    }
  };

  // Función para formatear el costo a miles sin decimales.
  const formatSaldo = (saldo) => {
    // Crea una instancia de Intl.NumberFormat con la configuración regional "es-CO" (Colombia)
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

    // Formatea el costo usando la configuración especificada.
    return formatter.format(saldo);
  };

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  return (
    <>
      {
        <div
          className="flex justify-center items-center flex-col gap-x-14 text-center"
          style={{ minHeight: "75vh" }}
        >
          <h1 className="font-semibold text-2xl">
            Seleccione el movimiento que desee realizar
          </h1>

          <div className="w-full flex overflow-hidden border-gray-200 dark:bg-gray-800 flex-col sm:flex sm:items-center sm:justify-between">
            <div className="w-full p-4 max-w-5xl mx-auto">
              <div className="mt-4 ">
                <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between  bg-DarkSlate px-4 py-8 rounded">
                  <div className="flex flex-col justify-center gap-y-2 h-24 ">
                    <div className="flex items-center ">
                      <p className="font-regular text-2xl text-white dark:text-gray-200 ">
                        Saldo total
                      </p>
                    </div>
                    <div className="flex jutify-center items-end gap-x-2">
                      <p className="font-semibold text-3xl text-white dark:text-gray-300">
                        {formatSaldo(idEmpleadoDetails.saldo)}
                      </p>
                    </div>
                  </div>

                  <div className="   grid gap-x-4 gap-y-4 mt-4 sm:flex sm:items-start sm:justify-between ">
                    <button
                      className="flex justify-center items-center gap-x-2 px-3 py-2 rounded-md text-white backdrop-blur-sm hover:backdrop-blur-lg bg-white/30 shadow"
                      onClick={() => setOpenModal3(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.4}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                        />
                      </svg>

                      <p>Entregar saldo</p>
                    </button>
                    <Modal
                      className="bg-black bg-opacity-60 flex justify-center items-center w-screen h-screen p-0"
                      show={openModal3}
                      size="md"
                      onClose={() => setOpenModal3(false)}
                      popup
                    >
                      <Modal.Header>
                        <span className="text-xl py-2 pl-4 pr-3 font-medium text-gray-900 dark:text-white">
                          Entrega de Saldo
                        </span>
                      </Modal.Header>
                      <Modal.Body className="px-5 pt-2 pb-5">
                        <div className="space-y-6">
                          <div>
                            <label
                              htmlFor="amount"
                              className="font-medium text-gray-700 dark:text-white"
                            >
                              Monto a entregar:
                            </label>
                            <input
                              id="amount"
                              type="number"
                              placeholder="Monto a consignar"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className={`w-full px-3 py-2 border rounded-md focus:outline-none`}
                            />
                          </div>
                          <div className="w-full">
                            <button
                              onClick={handleDevolverSaldo}
                              className={`w-full bg-green hover:bg-green hover:scale-105 duration-100 text-white font-bold py-2 px-4 rounded transition-all`}
                            >
                              Enviar
                            </button>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                    {idEmpleadoDetails.estado === "Solicitud" && (
                      <button
                        className="flex justify-center items-center gap-x-2 px-3 py-2 rounded-md text-white backdrop-blur-sm hover:backdrop-blur-lg bg-white/30 shadow"
                        onClick={handleCancelarSolicitud}
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
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>

                        <p>Cancelar solicitud</p>
                      </button>
                    )}
                    <>
                      {idEmpleadoDetails.estado === "Activo" && (
                        <>
                          <button
                            className="flex justify-center items-center gap-x-2 px-3 py-2 rounded-md text-white backdrop-blur-sm hover:backdrop-blur-lg bg-white/30 shadow"
                            onClick={() => setOpenModal2(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.4}
                              stroke="currentColor"
                              className="size-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                              />
                            </svg>
                            <p>Solicitar saldo</p>
                          </button>
                          <Modal
                            className="bg-black bg-opacity-60 flex justify-center items-center w-screen h-screen p-0"
                            show={openModal2}
                            size="md"
                            onClose={() => setOpenModal2(false)}
                            popup
                          >
                            <Modal.Header>
                              <span className="text-xl py-2 pl-4 pr-3 font-medium text-gray-900 dark:text-white">
                                Solicitar Saldo
                              </span>
                            </Modal.Header>
                            <Modal.Body className="px-5 pt-2 pb-5">
                              <div className="space-y-6">
                                <div>
                                  <label
                                    htmlFor="amount"
                                    className="font-medium text-gray-700 dark:text-white"
                                  >
                                    Monto a Solicitar:
                                  </label>
                                  <input
                                    id="amount"
                                    type="number"
                                    placeholder="Monto a consignar"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none`}
                                  />
                                </div>
                                <div className="w-full">
                                  <button
                                    onClick={handleSolicitarSaldo}
                                    className={`w-full bg-green hover:bg-green hover:scale-105 duration-100 text-white font-bold py-2 px-4 rounded transition-all`}
                                  >
                                    Enviar
                                  </button>
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal>
                        </>
                      )}
                    </>
                  </div>
                </div>
              </div>

              <div className=" grid gap-x-8 gap-y-4 mt-4 sm:flex sm:items-start sm:justify-between  ">
                <div className="flex-1 ">
                  <Button
                    className="border-emerald-500 w-full hover:bg-emerald-500 transition duration-300"
                    onClick={() => setOpenModal(true)}
                  >
                    <div className="flex flex-col items-center justify-center w-32 h-32">
                      <svg
                        className="w-14 text-emerald-500 dark:text-white group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v13m0-13 4 4m-4-4-4 4"
                        />
                      </svg>
                      <svg
                        className="w-24 text-emerald-500 dark:text-white group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7 6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M2 11a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                          clipRule="evenodd"
                        />
                        <path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                      </svg>
                      <span className="font-bold text-xl text-darkGreen group-hover:text-white">
                        Consignar
                      </span>
                    </div>
                  </Button>
                  <Modal
                    className="bg-black bg-opacity-60 flex justify-center items-center w-screen h-screen p-0"
                    show={openModal}
                    size="md"
                    onClose={onCloseModal}
                    popup
                  >
                    <Modal.Header>
                      <span className="text-xl py-2 pl-4 pr-3 font-medium text-gray-900 dark:text-white">
                        Consignar
                      </span>
                    </Modal.Header>
                    <Modal.Body className="px-5 pt-2 pb-5">
                      <div className="space-y-6">
                        <div>
                          <div className="mb-2 block">
                            <label
                              htmlFor="accountNumber"
                              className="font-medium text-gray-700 dark:text-white"
                            >
                              Número de cuenta de ahorro:
                            </label>
                          </div>
                          <input
                            id="accountNumber"
                            type="number"
                            placeholder="Número de cuenta"
                            value={accountNumber}
                            onChange={handleAccountNumberChange}
                            required
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                              !isAccountNumberFilled
                                ? "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                : ""
                            }`}
                          />
                          {isAccountNumberFilled && (
                            <button
                              onClick={() => handleConsultClick()}
                              className={`mt-2 bg-green hover:bg-green hover:scale-105 duration-100 text-white font-bold py-2 px-4 rounded transition-all ${
                                isFormDisabled
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={isFormDisabled}
                            >
                              Consultar
                            </button>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="accountOwner"
                            className="font-medium text-gray-700 dark:text-white"
                          >
                            Nombre del dueño de la cuenta:
                          </label>
                          <input
                            id="accountOwner"
                            type="text"
                            placeholder="Nombre del dueño"
                            value={accountOwner}
                            onChange={(event) =>
                              setAccountOwner(event.target.value)
                            }
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                              isFormDisabled || !isAccountNumberFilled
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                            readOnly
                            disabled={!isAccountNumberFilled}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="amount"
                            className="font-medium text-gray-700 dark:text-white"
                          >
                            Monto a consignar:
                          </label>
                          <input
                            id="amount"
                            type="number"
                            placeholder="Monto a consignar"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                              isFormDisabled || !isAccountNumberFilled
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                            disabled={!isAccountNumberFilled}
                          />
                        </div>
                        <div className="w-full">
                          <button
                            onClick={() => handleConsign(dataUser)}
                            className={`w-full bg-green hover:bg-green hover:scale-105 duration-100 text-white font-bold py-2 px-4 rounded transition-all ${
                              isFormDisabled || !isAccountNumberFilled
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={isFormDisabled || !isAccountNumberFilled}
                          >
                            Enviar
                          </button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>

                <div className="flex-1">
                  <Button
                    className="border-red-600 w-full hover:bg-red-600 transition duration-300"
                    onClick={() => setOpenModal1(true)}
                  >
                    <div className="flex flex-col items-center justify-center w-32 h-32">
                      <svg
                        className="w-24 text-red-600 dark:text-white group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7 6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M2 11a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                          clipRule="evenodd"
                        />
                        <path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                      </svg>
                      <svg
                        className="w-14 text-red-600 dark:text-white group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19V5m0 14-4-4m4 4 4-4"
                        />
                      </svg>
                      <span className="font-bold text-xl text-darkGreen group-hover:text-white">
                        Retirar
                      </span>
                    </div>
                  </Button>
                  <Modal
                    className="bg-black bg-opacity-60 flex justify-center items-center w-screen h-screen p-0"
                    show={openModal1}
                    size="md"
                    onClose={onCloseModal1}
                    popup
                  >
                    <Modal.Header>
                      <span className="text-xl py-2 pl-4 pr-3 font-medium text-gray-900 dark:text-white">
                        Retirar
                      </span>
                    </Modal.Header>
                    {/* retirar-------------------------------------------------------------------------------------------------- */}
                    <Modal.Body className="px-5 pt-2 pb-5">
                      <div className="space-y-6">
                        <div>
                          <div className="mb-2 block">
                            <label
                              htmlFor="accountNumberRetirar"
                              className="font-medium text-gray-700 dark:text-white"
                            >
                              Número de cuenta de ahorro:
                            </label>
                          </div>
                          <input
                            id="accountNumberRetirar"
                            type="number"
                            placeholder="Número de cuenta"
                            value={accountNumber}
                            onChange={handleAccountNumberChangeRetirar}
                            required
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                              !isAccountNumberFilled
                                ? "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                : ""
                            }`}
                          />
                          {isAccountNumberFilled && (
                            <button
                              onClick={() => handleConsultClickRetirar()}
                              className={`mt-2 bg-green hover:bg-green hover:scale-105 duration-100 text-white font-bold py-2 px-4 rounded transition-all ${
                                isFormDisabled
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={isFormDisabled}
                            >
                              Consultar
                            </button>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="accountOwnerRetirar"
                            className="font-medium text-gray-700 dark:text-white"
                          >
                            Nombre del dueño de la cuenta:
                          </label>
                          <input
                            id="accountOwnerRetirar"
                            type="text"
                            placeholder="Nombre del dueño"
                            value={accountOwner}
                            onChange={(event) =>
                              setAccountOwner(event.target.value)
                            }
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                              isFormDisabled || !isAccountNumberFilled
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                            readOnly
                            disabled={!isAccountNumberFilled}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="amountRetirar"
                            className="font-medium text-gray-700 dark:text-white"
                          >
                            Monto a retirar:
                          </label>
                          <input
                            id="amountRetirar"
                            type="number"
                            placeholder="Monto a retirar"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                              isFormDisabled || !isAccountNumberFilled
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                            disabled={!isAccountNumberFilled}
                          />
                        </div>
                        <div className="w-full">
                          <button
                            onClick={() => handleRetirar(dataUser)}
                            className={`w-full bg-red-600 hover:bg-red-600 hover:scale-105 duration-100 text-white font-bold py-2 px-4 rounded transition-all ${
                              isFormDisabled || !isAccountNumberFilled
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={isFormDisabled || !isAccountNumberFilled}
                          >
                            Retirar
                          </button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
