import React from "react";
import TopLogo from "../../../assets/Img/Logos/ClarBank Banner.svg";

export const Banner = () => {
  return (
    <>
      <div className="bg-white mx-4 md:mx-12 lg:mx-20 xl:mx-32 flex flex-col md:flex-row rounded shadow-md">
        <div className="bg-gradient-to-r from-green-400 flex flex-col justify-evenly w-full md:w-3/4 rounded">
          <h1 className="p-8 flex justify-center md:text-3xl lg:text-4xl xl:text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-left">
            ¡Bienvenido a ClarBank, tu destino financiero de confianza!
          </h1>
          <p className="px-4 md:px-12 md:py-8 lg:py-12 text-sm md:text-base lg:text-lg xl:text-xl font-normal text-gray-700 dark:text-gray-400 text-center md:text-left">
            En ClarBank, no solo abrimos puertas, ¡creamos oportunidades!
            Estamos emocionados de darte la bienvenida a nuestra plataforma
            financiera donde la excelencia y el compromiso son nuestra
            prioridad.
          </p>
        </div>
        <div className="mx-4 md:mx-24">
          <img src={TopLogo} className="h-40 md:h-60 xl:h-80" alt="ClarBank" />
        </div>
      </div>
    </>
  );
};
