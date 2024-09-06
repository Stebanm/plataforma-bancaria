import React, { useState, useEffect } from "react";
import Logo from "../../assets/Img/Logos/ClarBank LogoOnly.svg";

import { ContentCuentaAhorroJuridica } from "./Components/ContentCuentaAhorroJuridica/ContentCuentaAhorroJuridica";
import { ContentCuentaAhorroNatural } from "./Components/ContentCuentaAhorroNatural/ContentCuentaAhorroNatural";
import { PrincipalPage } from "./Components/PrincipalPage";
import userProfile from "../../assets/Img/Login/user.png";
import { No_Disponible } from "./Components/NoDisponible";
import { AutorizacionCuentas } from "./Components/Director/AutorizacionCuentas";
import { CrearUsuario } from "./Components/Director/CrearUsuario";

import { useAuth } from "../../context/AuthContext";
import { Reportes } from "./Components/Director/Reportes";
import { NavLink } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { Historial } from "./Components/Director/Historial";
import { HistorialD } from "./Components/Director/HistorialD";
import { BusquedaC } from "./Components/BusquedaC";
import { Movimientos } from "./Components/Cajero/Movimientos";
import { ReportesMovimientos } from "./Components/CajeroPrincipal/ReportesMovimientos";
import Boveda from "./Components/CajeroPrincipal/Boveda";
import Transfers from "/src/Components/DashBoard/Components/CajeroPrincipal/Transfers.jsx";
import AperturaCuentaAhorro from "./Components/Cajero/AperturaCuentaAhorro";
import { ClientView } from "./Components/Cliente/ClientView";
import { AllTarjets } from "./Components/Cliente/AllTarjets";
import { ClientMovimientos } from "./Components/Cliente/ClientMovimientos";
import  { Cancelación } from "./Components/Cajero/Cancelación";
import   Consignar  from "./Components/Cajero/Consignar";


export const DashboardComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userData, setUserData] = useState([]); // Variable de estado para almacenar el nombre de usuario
  const [data, setData] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [contenidoSeleccionado, setContenidoSeleccionado] =
    useState("PrincipalPage");

  const [contenidoCliente, setContenidoCliente] = useState("ClientView");

  const { user, isLoggedIn, logout } = useAuth();

  // Efecto para guardar el nombre de usuario cuando el componente se monta
  useEffect(() => {
    // Verificar si el usuario está autenticado y obtener su nombre de usuario si es así
    if (isLoggedIn && user) {
      setUserName(user.username); // Almacenar el nombre de usuario en el estado
      // Mostrar el nombre de usuario en la consola
    }

    const fetchData = async () => {
      try {
        // Verificar que se haya almacenado el nombre de usuario en el estado
        if (userName) {
          const response = await fetch(
            `http://localhost:3000/get_client/${userName}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setUserData(data); // Almacenar los datos del usuario en el estado
          setData(userData.ip_primernombre);
          console.log(userData);
          const dataFetch = await response.json();
          setUserData(dataFetch); // Almacenar los datos del usuario en el estado
          setData(dataFetch[0]);
        }
      } catch (error) {
        console.error("Error al obtener información:", error);
      }
    };

    // Llamar a la función fetchData si el nombre de usuario está disponible
    fetchData();
  }, [isLoggedIn, user, userName]); // Agregar userName como dependencia del efecto

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleMouseEnter = () => {
    setTimeout(() => {
      setFlipped(true);
    }, 400); // Retraso de 1000 milisegundos (1 segundo)
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setFlipped(false);
    }, 400); // Retraso de 1000 milisegundos (1 segundo)
  };

  // Función para manejar clics de botones
  const handleBotonClick = (contenido) => {
    setContenidoSeleccionado(contenido);
  };

  const handleClient = (contenido) => {
    setContenidoCliente(contenido);
  };

  const handlelogout = () => {
    logout();
  };

  // console.log(userName);
  // console.log(userData);
  // console.log(user);
  // console.log(data);
  // console.log({ contenidoSeleccionado });

  return (
    <>
      {isLoggedIn && user.id_rol !== 5 && (
        <>
          <div className="flex h-screen overflow-hidden bg-beige">
            {/* Sidebar */}
            <div
              className={`${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } xl:flex xl:flex-col absolute xl:static z-40 left-0 top-0 xl:translate-x-0 bg-beige h-screen overflow-y-scroll xl:overflow-y-auto no-scrollbar w-80 shrink-0 transition-all duration-200 ease-in-out transform`}
              aria-label="Sidebar"
            >
              <div className="h-full bg-white xl:border-r-2 border-beige">
                {/* Sidebar header */}
                <div className="flex flex-col justify-between h-full py-4">
                  {/* Close sidebar (only movil) */}
                  <button
                    className="xl:hidden text-slate-500 hover:text-slate-400 px-2"
                    aria-controls="sidebar"
                    onClick={toggleSidebar}
                  >
                    <span className="sr-only">Close sidebar</span>
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
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                  </button>

                  <div className="flex flex-col justify-between w-full h-full">
                    {/* Logo */}
                    <NavLink
                      to="/DashboardMenu"
                      className="flex justify-center items-center h-20 my-6"
                    >
                      <img
                        src={Logo}
                        alt="ClarBank"
                        className="inline h-full max-w-full transition-all duration-200"
                      />
                    </NavLink>

                    <div className="items-center block w-full max-h-screen overflow-auto h-sidenav grow basis-full px-6">
                      <hr className="border-gray-200 dark:border-gray-700 mb-6" />
                      <ul className="flex flex-col space-y-1 pl-0 mb-0">
                        <button
                          className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                          onClick={() => {
                            closeSidebar();
                            handleBotonClick("PrincipalPage");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.4}
                            stroke="currentColor"
                            className="size-5 xl:size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                            />
                          </svg>

                          <span className="mx-1">Inicio</span>
                        </button>

                        {/* Aside director */}
                        {user?.id_rol == 1 && (
                          <>
                            <button
                              className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                              onClick={() => {
                                closeSidebar();
                                handleBotonClick("AutorizacionCuentas");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5 xl:size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                                />
                              </svg>

                              <span className="mx-1">Autorizar cuentas</span>
                            </button>

                            <button
                              className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                              onClick={() => {
                                closeSidebar();
                                handleBotonClick("CrearUsuario");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5 xl:size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                />
                              </svg>

                              <span className="mx-1">Empleados</span>
                            </button>

                            <button
                              className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                              onClick={() => {
                                closeSidebar();
                                handleBotonClick("ReportesMovimientos");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5 xl:size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                                />
                              </svg>

                              <span className="mx-1">Movimientos</span>
                            </button>

                            <button
                              className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                              onClick={() => {
                                closeSidebar();
                                handleBotonClick("Boveda");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.4}
                                stroke="currentColor"
                                className="size-5 xl:size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                                />
                              </svg>

                              <span className="mx-1">Bóveda</span>
                            </button>

                            <button
                              className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                              onClick={toggleDropdown}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5 xl:size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                />
                              </svg>

                              <span className="mx-1">Historial cuentas</span>
                              <button onClick={toggleDropdown}>
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
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </button>
                            </button>
                            {isOpen && (
                              <div className="mt-2 space-y-2 ">
                                <button
                                  className="flex items-center ml-10 px-2 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-gray-100  hover:text-bg-darkGray focus:outline-none space-x- xl:text-sm 2xl:text-base"
                                  onClick={() => {
                                    closeSidebar();
                                    handleBotonClick("Historial");
                                  }}
                                >
                                  <span className="mx-1 text-center px-7 ">
                                    Cuentas Aceptadas
                                  </span>
                                </button>
                                <button
                                  className="flex items-center ml-10 px-1 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-gray-100  hover:text-bg-darkGray focus:outline-none space-x-2 xl:text-sm 2xl:text-base"
                                  onClick={() => {
                                    closeSidebar();
                                    handleBotonClick("HistorialD");
                                  }}
                                >
                                  <span className="mx-1 text-center px-7">
                                    Cuentas Denegadas
                                  </span>
                                </button>
                              </div>
                            )}
                          </>
                        )}

                        {/* Aside asesor */}
                        {user?.id_rol == 2 && (
                          <>
                            {/* Dropdown */}

                            <div
                              className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                              onClick={toggleDropdown}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5 xl:size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                />
                              </svg>

                              <span className="mx-1">Cuenta de Ahorros</span>
                              <button onClick={toggleDropdown}>
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
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </button>
                            </div>
                            {isOpen && (
                              <div className="mt-2 space-y-2 ">
                                <button
                                  className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-gray-100  hover:text-bg-darkGray focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                                  onClick={() => {
                                    closeSidebar();
                                    handleBotonClick(
                                      "FormularioPersonaNatural"
                                    );
                                  }}
                                >
                                  <span className="mx-1 text-center px-10">
                                    Natural
                                  </span>
                                </button>
                              </div>
                            )}

                            <button
                              className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                              onClick={() => {
                                closeSidebar();
                                handleBotonClick("Busqueda");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                                />
                              </svg>

                              <span className="mx-1">Historial Clientes</span>
                            </button>

                            <button
                              className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                              onClick={() => {
                                closeSidebar();
                                handleBotonClick("ReportesMovimientos");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.4}
                                stroke="currentColor"
                                className="size-5 xl:size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                                />
                              </svg>

                              <span className="mx-1">Movimientos</span>
                            </button>
                          </>
                        )}

                        {/* Aside cajero */}
                        {user?.id_rol == 3 && (
                          <>
                            <button
                              className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                              onClick={() => {
                                closeSidebar();
                                toggleDropdown();
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5 xl:size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                />
                              </svg>

                              <span className="mx-1">Cuenta de Ahorros</span>
                              <button onClick={toggleDropdown}>
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
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </button>
                            </button>
                            {isOpen && (
                              <div className="mt-2 space-y-2 ">
                                <button
                                  className="flex items-center justify-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-gray-100 hover:text-bg-darkGray focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                                  onClick={() => {
                                    closeSidebar();
                                    handleBotonClick("AperturaCuentaAhorro");
                                  }}
                                >
                                  <span className="mx-1 text-center text-sm ">
                                    Apertura C. Ahorros
                                  </span>
                                </button>
                                <button
                                  className="flex items-start justify-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-gray-100 hover:text-bg-darkGray focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                                  onClick={() => {
                                    closeSidebar();
                                    handleBotonClick("Cancelación");
                                  }}
                                >
                                  <span className="mx-1 text-center text-sm ">
                                    Cancelación C. Ahorros
                                  </span>
                                </button>

                              </div>
                              
                            )}

<button
                              className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                              onClick={() => {
                                closeSidebar();
                                handleBotonClick("Consignar");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                                />
                              </svg>

                              <span className="mx-1">Consignar</span>
                            </button>
                          </>
                        )}

                        {/* Aside cajero principal */}
                        {user?.id_rol == 4 && (
                          <>
                            <button
                              className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                              onClick={() => {
                                closeSidebar();
                                handleBotonClick("CrearUsuario");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.4}
                                stroke="currentColor"
                                className="size-5 xl:size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                                />
                              </svg>
                              <span className="mx-1">Empleados</span>
                            </button>

                            <button
                              className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                              onClick={() => {
                                closeSidebar();
                                handleBotonClick("ReportesMovimientos");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.4}
                                stroke="currentColor"
                                className="size-5 xl:size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                                />
                              </svg>

                              <span className="mx-1">Movimientos</span>
                            </button>

                            <button
                              className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                              onClick={() => {
                                closeSidebar();
                                handleBotonClick("Boveda");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.4}
                                stroke="currentColor"
                                className="size-5 xl:size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                                />
                              </svg>

                              <span className="mx-1">Bóveda</span>
                            </button>
                          </>
                        )}
                      </ul>
                      <hr className="border-gray-200 dark:border-gray-700 mt-6" />
                    </div>

                    <div className="mx-4">
                      <div
                        className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border"
                        sidenav-card="true"
                      >
                        <img
                          className="w-1/1 mx-auto"
                          src="/src/assets/Img/UsoVario/Analytics.svg"
                          alt="sidebar illustrations"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black opacity-25 z-30 md:hidden"
                onClick={toggleSidebar}
              ></div>
            )}

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {/*  Site header */}
              <header className="bg-white sticky top-0 border-b border-gray">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16 -mb-px">
                    {/* Header: Left side */}
                    <div className="flex">
                      {/* Hamburger button */}
                      <button
                        className="text-slate-500 hover:text-slate-600 xl:hidden"
                        aria-controls="sidebar"
                        onClick={toggleSidebar}
                      >
                        <span className="sr-only">Open sidebar</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Botón para configuraciones */}
                    <Dropdown
                      arrowIcon={false}
                      inline
                      label={
                        <div className="flex flex-row items-center text-sm bg-white rounded-full focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-600 gap-x-3">
                          <div className="flex flex-col justify-end ps-8 my-0">
                            <p className="flex items-center justify-end text-sm font-semibold text-gray-700 dark:text-gray-200">
                              {user?.username}
                            </p>
                            <p className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400">
                              {user?.id_rol == 2 && <> Asesor </>}
                              {user?.id_rol == 1 && <> Director </>}
                              {user?.id_rol == 3 && <> Cajero </>}
                              {user?.id_rol == 4 && (
                                <> Cajero Principal </>
                              )}{" "}
                            </p>
                          </div>
                          <div className="flex items-center gap-x-6">
                            <div className="relative">
                              <img
                                className="object-cover w-10 h-10 rounded-full ring ring-gray-300 dark:ring-gray-600"
                                // src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
                                src={userProfile}
                                alt=""
                              />
                              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute right-0 ring-1 ring-white bottom-0"></span>
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <Dropdown.Header>
                        <span className="block text-sm">{user?.username}</span>

                        <span className="block truncate text-sm font-medium">
                          {user?.username}@clarkbank.com
                        </span>
                      </Dropdown.Header>
                      <Dropdown.Item>
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
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                          />
                        </svg>
                        <p className="ml-2" onClick={handlelogout}>
                          Cerrar Sesión
                        </p>
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </div>
              </header>

              {/* Main content */}
              <main
                className={`p-4 sm:p-2 lg:p-4 transition-opacity duration-200 ${
                  sidebarOpen ? "opacity-50" : "opacity-100"
                }`}
              >
                <div className="border-2 border-gray-300 border-dashed rounded-lg p-2">
                  {contenidoSeleccionado === "FormularioPersonaNatural" && (
                    <ContentCuentaAhorroNatural />
                  )}
                  {contenidoSeleccionado === "FormularioPersonaJuridica" && (
                    <ContentCuentaAhorroJuridica />
                  )}
                  {contenidoSeleccionado === "PrincipalPage" && (
                    <PrincipalPage />
                  )}
                  {contenidoSeleccionado === "NoDisponible" && (
                    <No_Disponible />
                  )}
                  {contenidoSeleccionado === "AutorizacionCuentas" && (
                    <AutorizacionCuentas />
                  )}
                  {contenidoSeleccionado === "CrearUsuario" && <CrearUsuario />}
                  {contenidoSeleccionado === "Reportes" && <Reportes />}
                  {contenidoSeleccionado === "Historial" && <Historial />}
                  {contenidoSeleccionado === "HistorialD" && <HistorialD />}
                  {contenidoSeleccionado === "Busqueda" && <BusquedaC />}
                  {contenidoSeleccionado === "Movimientos" && <Movimientos />}
                  {contenidoSeleccionado === "Empleados" && <Empleados />}
                  {contenidoSeleccionado === "ReportesMovimientos" && (
                    <ReportesMovimientos />
                  )}
                  {contenidoSeleccionado === "Boveda" && <Boveda />}
                  {contenidoSeleccionado === "Transfers" && <Transfers />}
                  {contenidoSeleccionado === "Cancelación" && <Cancelación/>}
                  {contenidoSeleccionado === "Consignar" && <Consignar/>}

                  {contenidoSeleccionado === "AperturaCuentaAhorro" && (
                    <AperturaCuentaAhorro />
                  )}

                  {/* Renderiza otros contenidos según sea necesario */}
                </div>
              </main>
            </div>
          </div>
        </>
      )}

      {isLoggedIn && user.id_rol === 5 && userData && (
        <>
          <div className="flex h-screen overflow-hidden bg-beige">
            {/* Sidebar */}
            <div
              className={`${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } xl:flex xl:flex-col absolute xl:static z-40 left-0 top-0 xl:translate-x-0 bg-beige h-screen overflow-y-scroll xl:overflow-y-auto no-scrollbar w-80 shrink-0 transition-all duration-200 ease-in-out transform`}
              aria-label="Sidebar"
            >
              <div className="h-full bg-white xl:border-r-2 border-beige">
                {/* Sidebar header */}
                <div className="flex flex-col justify-between h-full py-4">
                  {/* Close sidebar (only movil) */}
                  <button
                    className="xl:hidden text-slate-500 hover:text-slate-400 px-2"
                    aria-controls="sidebar"
                    onClick={toggleSidebar}
                  >
                    <span className="sr-only">Close sidebar</span>
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
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                  </button>

                  <div className="flex flex-col justify-between w-full h-full">
                    {/* Logo */}
                    <NavLink
                      to="/DashboardMenu"
                      className="flex justify-center items-center h-20 my-6"
                    >
                      <img
                        src={Logo}
                        alt="ClarBank"
                        className="inline h-full max-w-full transition-all duration-200"
                      />
                    </NavLink>

                    <div className="items-center block w-full max-h-screen overflow-auto h-sidenav grow basis-full px-6">
                      <hr className="border-gray-200 dark:border-gray-700 mb-6" />
                      <ul className="flex flex-col space-y-1 pl-0 mb-0">
                        <button
                          className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                          onClick={() => {
                            closeSidebar();
                            handleClient("ClientView");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.4}
                            stroke="currentColor"
                            className="size-5 xl:size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                            />
                          </svg>

                          <span className="mx-1">Inicio</span>
                        </button>

                        <button
                          className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                          onClick={() => {
                            closeSidebar();
                            handleClient("ClientTransfers");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.4}
                            stroke="currentColor"
                            className="size-5 xl:size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                            />
                          </svg>

                          <span className="mx-1">Transferencias</span>
                        </button>

                        <button
                          className="flex items-center px-4 py-2 font-medium tracking-wide text-darkGray capitalize transition-colors duration-300 transform bg-transparent rounded-md hover:bg-darkGray hover:text-white focus:outline-none space-x-2 w-full xl:text-sm 2xl:text-base"
                          onClick={() => {
                            closeSidebar();
                            handleClient("ClientTarjet");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.4}
                            stroke="currentColor"
                            className="size-5 xl:size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                            />
                          </svg>

                          <span className="mx-1">Tus tarjetas</span>
                        </button>
                      </ul>
                      <hr className="border-gray-200 dark:border-gray-700 mt-6" />
                    </div>

                    <div className="mx-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                        <img
                          className="w-1/1 mx-auto"
                          src="/src/assets/Img/UsoVario/Analytics.svg"
                          alt="sidebar illustrations"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black opacity-25 z-30 md:hidden"
                onClick={toggleSidebar}
              ></div>
            )}

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {/*  Site header */}
              <header className="bg-white sticky top-0 border-b border-gray">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16 -mb-px">
                    {/* Header: Left side */}
                    <div className="flex">
                      {/* Hamburger button */}
                      <button
                        className="text-slate-500 hover:text-slate-600 xl:hidden"
                        aria-controls="sidebar"
                        onClick={toggleSidebar}
                      >
                        <span className="sr-only">Open sidebar</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Botón para configuraciones */}
                    <Dropdown
                      arrowIcon={false}
                      inline
                      label={
                        <div className="flex flex-row items-center text-sm bg-white rounded-full focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-600 gap-x-3">
                          <div className="flex flex-col justify-end ps-8 my-0">
                            <p className="flex items-center justify-end text-sm font-semibold text-gray-700 dark:text-gray-200">
                              {data?.nombre}
                            </p>
                            <p className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400">
                              {data?.ip_tipodoc + " " + data?.documento}
                            </p>
                          </div>
                          <div className="flex items-center gap-x-6">
                            <div className="relative">
                              <img
                                className="object-cover w-10 h-10 rounded-full ring ring-gray-300 dark:ring-gray-600"
                                // src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
                                src={userProfile}
                                alt=""
                              />
                              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute right-0 ring-1 ring-white bottom-0"></span>
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <Dropdown.Header>
                        <span className="block text-sm">
                          {data?.nombre +
                            " " +
                            data?.ip_primerapellido +
                            " " +
                            data?.ip_segundoapellido}
                        </span>

                        <span className="block truncate text-sm font-medium">
                          {data?.ip_tipodoc + " " + data?.documento}
                        </span>
                      </Dropdown.Header>
                      <Dropdown.Item>
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
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                          />
                        </svg>
                        <p className="ml-2" onClick={handlelogout}>
                          Cerrar Sesión
                        </p>
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </div>
              </header>

              {/* Main content */}
              <main
                className={`p-4 sm:p-2 lg:p-4 transition-opacity duration-200 ${
                  sidebarOpen ? "opacity-50" : "opacity-100"
                }`}
              >
                <div className="border-2 border-gray-300 border-dashed rounded-lg p-4">
                  {contenidoCliente === "ClientView" && (
                    <ClientView
                      user={user}
                      isLoggedIn={isLoggedIn}
                      userName={userName}
                      setUserName={setUserData}
                      userData={userData}
                      setUserData={setUserData}
                      contenidoCliente={contenidoCliente}
                      setContenidoCliente={setContenidoCliente}
                    />
                  )}

                  {contenidoCliente === "ClientTransfers" && (
                    <ClientMovimientos
                      userData={userData}
                      contenidoCliente={contenidoCliente}
                      setContenidoCliente={setContenidoCliente}
                    />
                  )}

                  {contenidoCliente === "ClientTarjet" && (
                    <AllTarjets
                      userData={userData}
                      contenidoCliente={contenidoCliente}
                    />
                  )}

                  {/* Renderiza otros contenidos según sea necesario */}
                </div>
              </main>
            </div>
          </div>
          {/* <section className="w-screen h-screen  flex justify-center items-center flex-col">
            <header>
              <span className="text-3xl font-bold">Módulo Cliente</span>
            </header>
            <main className="h-3/4 w-full bg-white flex justify-center items-center">
              Lado principal
              <div
                className={`bg-white bg-gradient-to-r from-green to-white h-80 w-128 rounded-xl shadow-xl relative ${
                  flipped ? "flip" : ""
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={`h-1/3 flex items-end ${flipped ? "hidden" : ""}`}
                >
                  <img className="pl-4" src={ChipCard} alt="" />
                  <img className="text-stone-300" src={""} alt="" />
                </div>
                <div
                  className={`h-2/3 flex justify-end items-end ${
                    flipped ? "hidden" : ""
                  }`}
                >
                  <img className="w-36 py-5" src={Namelogo} alt="" />
                  <img className="h-32" src={Logo} alt="" />
                </div>
                <div
                  className={`h-12 mt-8 bg-emerald-700 ${
                    flipped ? "" : "hidden"
                  }`}
                >
                  Contenido en el reverso de la tarjeta
                  <div className="flip-content">
                    <div
                      className={`text-gray-800 pt-16 flex justify-center text-4xl `}
                    >
                      <p>${userData[0].saldo}</p>
                    </div>
                    <div
                      className={`text-gray-800 mt-24 flex flex-col justify-end items-end px-2 `}
                    >
                      <p>{userData[0].descripcion}</p>
                      <p>{userData[0].num_cuenta}</p>
                      <p className="text-lg">
                        {userData[0].ip_primernombre}{" "}
                        {userData.ip_primerapellido}{" "}
                        {userData[0].ip_primernombre}{" "}
                        {userData.ip_primerapellido}{" "}
                        {userData[0].ip_segundoapellido}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <div>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div className="flex flex-row items-center  text-sm bg-white rounded-full focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-600">
                    {" "}
                    <p className=" flex items-center text-sm bg-white rounded-full focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-600 ">
                      {user?.username} - {user?.id_rol == 2 && <> Asesor </>}
                      {user?.id_rol == 1 && <> Director </>}{" "}
                    </p>
                    <HiUserCircle color="gray" className="w-16 h-10 " />{" "}
                  </div>
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user?.username}</span>
                  <span className="block truncate text-sm font-medium">
                    {user?.username}@ClarBank.com
                  </span>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handlelogout}>Salir</Dropdown.Item>
              </Dropdown>
            </div>
          </section> */}
        </>
      )}
    </>
  );
};
