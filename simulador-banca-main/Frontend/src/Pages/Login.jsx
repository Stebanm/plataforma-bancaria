import React, { useState } from "react";

import Logo from "../assets/Img/Logos/ClarBank Logo.svg";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { setIsLoggedIn, login, setUserData } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const inisesion = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        toast.success("Inicio de sesion exitoso ");
        setTimeout(() => {
          // Actualiza localmente el estado del cliente según sea necesario
          // Puedes utilizar la función setDatauser para actualizar el estado local
          // Ejemplo: setDatauser(prevData => [...prevData, data.updatedClient]);
          // alert('Autorización exitosa')
          // Redirige a la página '/DashBoardMenu' después de procesar la respuesta
          window.location.href = "/DashboardMenu";
        }, 2000);

        setIsLoggedIn(true);
        login(responseData.user);

        // Aquí asignamos los datos del usuario al contexto de autenticación
        setUserData(responseData.user);
      } else {
        toast.error("Inicio de sesion Erroneo ");
        setTimeout(() => {
          // Actualiza localmente el estado del cliente según sea necesario
          // Puedes utilizar la función setDatauser para actualizar el estado local
          // Ejemplo: setDatauser(prevData => [...prevData, data.updatedClient]);
          // alert('Autorización exitosa')
          // Redirige a la página '/DashBoardMenu' después de procesar la respuesta
        }, 1000);
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: "No se encontró información del usuario" });
    }
  };

  return (
    <div className="absolute inset-0 bg-green-100 ">
      <div className=" absolute inset-0 flex items-center md:justify-center max-sm:justify-center max-[900px]:justify-center lg:justify-evenly">
        <div className="lg:not-sr-only max-[900px]:sr-only md:sr-only max-sm:sr-only ">
          <img src={Logo} alt="" className="object-cover" />
        </div>

        <div className="w-full max-w-sm  p-4  bg-white border border-gray-200 rounded-lg shadow sm:p-8 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form
            className="space-y-6"
            action="#"
            onSubmit={handleSubmit(inisesion)}
          >
            <img
              src={Logo}
              className="flex justify-center h-64 w-96 lg:sr-only md:not-sr-only "
            />
            <div>
              <label
                htmlFor="Text"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Usuario
              </label>
              <input
                type="Text"
                {...register("username")}
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-green dark:text-white"
                placeholder="Nombre de usuario"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Contraseña
              </label>
              <input
                type="password"
                {...register("password")}
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div className="flex items-start">
              {/* <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4   border border-gray-300 rounded bg-gray-100 focus:ring-3 focus:ring-green dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green dark:ring-offset-gray-600 dark:focus:ring-offset-gray" required />
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div> */}
            </div>

            <button
              type="sumit"
              className="w-full my-4 text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Login to your account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
