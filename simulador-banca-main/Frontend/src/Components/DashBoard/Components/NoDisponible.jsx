import React from "react";
import NoDisponible from "../../../assets/Img/no service.svg";
export const No_Disponible = () => {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div
            className="bg-gray-200 flex justify-center items-center flex-col gap-10"
            style={{ minHeight: "85vh" }}
          >
            <p className="font-bold text-3xl">
              Estamos trabajando para mejorar tu experiencia...
            </p>
            <img className="w-1/3" src={NoDisponible} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
