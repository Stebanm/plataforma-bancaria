import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDirector, setIsDirector] = useState(false);

  useEffect(() => {
    const loggedIn = Cookies.get("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const bankUser = Cookies.get("User");
    if (bankUser) {
      const userData = JSON.parse(bankUser);
      setUser(userData);
      setIsDirector(userData.rol === "1");
    }
  }, []);

  const login = (userData) => {
    Cookies.set("User", JSON.stringify(userData));
    setUser(userData);
    Cookies.set("isLoggedIn", "true", { expires: 7 });
    setIsLoggedIn(true);
    setIsDirector(userData.rol === "1");
  };

  const logout = () => {
    console.log("se presiono  cerrar sesion");
    toast.success("haz cerrado sesion");
    setTimeout(() => {
      // Actualiza localmente el estado del cliente según sea necesario
      // Puedes utilizar la función setDatauser para actualizar el estado local
      // Ejemplo: setDatauser(prevData => [...prevData, data.updatedClient]);
      // alert('Autorización exitosa')
      // Redirige a la página '/DashBoardMenu' después de procesar la respuesta
      Cookies.remove("User");
      Cookies.remove("selectedAccount");
      setUser(null);
      setIsDirector(false);
      Cookies.remove("isLoggedIn");
      setIsLoggedIn(false);
      window.location = "/landing";
    }, 2000);

    // Utiliza Navigate para redirigir en lugar de window.location
  };

  const setUserData = (userData) => {
    setUser(userData);
  };

  const setCookie = (name, value) => {
    Cookies.set(name, value);
  };

  const getCookie = (name) => {
    return Cookies.get(name);
  };

  const updateUserData = async (userData) => {
    try {
      const response = await fetch(
        "https://simulador-banca.onrender.com/UpdateUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        const updatedUserData = await response.json();
        setUserData(updatedUserData);
        Cookies.set("User", JSON.stringify(updatedUserData));

        return {
          success: true,
          message: "Datos de usuario actualizados con éxito",
        };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message };
      }
    } catch (error) {
      console.error("Error al actualizar los datos del usuario:", error);
      return { success: false, message: "Error en el servidor" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
        user,
        setUserData,
        setCookie,
        getCookie,
        isDirector,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
