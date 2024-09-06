import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export const Reportes = () => {
  const [infouser, setinfouser] = useState([]);
  useEffect(() => {
    const fecthInfo = async () => {
      try {
        const response = await fetch("http://localhost:3000/details");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const info = await response.json();
        setinfouser(info.result.rows);
        console.log(info.result.rows[0]);
      } catch (error) {
        console.error("error al encontrar informacion");
      }
    };
    fecthInfo();
  }, []);
  console.log(infouser);

  useEffect(() => {
    // Verifica si hay datos en infouser antes de crear el gráfico
    const filteredUsers = infouser.filter((user) => user.rol === 2);
    const finalFilteredUsers = filteredUsers.filter(
      (user) => user.id_usuario !== 2
    );

    if (finalFilteredUsers.length > 0) {
      // Obtén nombres de usuarios y datos para el gráfico
      const labels = finalFilteredUsers.map((user) => user.name_user);
      const dataValues = finalFilteredUsers.map(
        (user) => user.algunCampoDeDatos
      );

      // Datos para el gráfico
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Cuentas Aperturadas",
            data: dataValues,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 0.5,
          },
        ],
      };
      // Opciones del gráfico
      const options = {
        // Configuraciones adicionales del gráfico
      };

      // Obtén el contexto del canvas
      const ctx = document.getElementById("miGrafico").getContext("2d");

      // Crea el gráfico
      const miGrafico = new Chart(ctx, {
        type: "bar", // o cualquier otro tipo de gráfico deseado
        data: data,
        options: options,
      });

      // Asegúrate de destruir el gráfico al desmontar el componente para evitar fugas de memoria
      return () => {
        miGrafico.destroy();
      };
    }
  }, [infouser]); // Este efecto se ejecutará cada vez que infouser se actualice

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div
            className="flex justify-center items-center flex-col gap-32"
            style={{ minHeight: "85vh" }}
          >
            <div className="w-3/4 text-black text-4xl flex items-center justify-center font-semibold text-center">
              <p>Reportes Generales</p>
            </div>
            <div className="w-8/12 relative overflow-x-auto shadow-md sm:rounded-lg">
              <p>Gráficos con chart.js</p>
              <div className="w-1/2">
                <canvas id="miGrafico"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
