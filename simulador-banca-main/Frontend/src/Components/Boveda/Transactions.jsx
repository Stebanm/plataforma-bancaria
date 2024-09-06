import React from "react";
import inicio2 from "../../assets/Img/Login/Inicio2.png";
import "boxicons";

const Transactions = () => {
  return (
    <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8"> {/* Contenedor de las dos cajas */}
      {/* Primera caja */}
      <div className="flex-1 max-w-2xl px-4 py-3 bg-white border border-emerald rounded-md shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-medium text-emerald dark:text-emerald">Ultima Consignacion</span>    
          <span className="px-3 py-1 text-xs text-blue-800 uppercase bg-emerald rounded-full dark:bg-blue-300 text-white">11109757</span>
    </div>
    <div class="flex mt-4">
  <div class="w-1/2">
    <h1 className="flex items-center mt-2 text-gray-700 dark:text-gray-200">Saldo Consignado</h1>
    <h1 className="flex items-center mt-2 text-gray-700 dark:text-gray-200">Fecha</h1>
    <h1 className="flex items-center mt-2 text-gray-700 dark:text-gray-200">Hora</h1>
    <h1 className="flex items-center mt-2 text-gray-700 dark:text-gray-200">Cajero</h1>
    <h1 className="flex items-center mt-2 text-gray-700 dark:text-gray-200">Id de Cajero </h1>
  </div>
  <div class="w-1/2 flex flex-col justify-between items-end text-center">
    <h1 class="mt-2 text-gray-700 dark:text-gray-200">23.000.000</h1>
    <h1 class="mt-2 text-gray-700 dark:text-gray-200">01/06/2024</h1>
    <h1 class="mt-2 text-gray-700 dark:text-gray-200">8:20 AM</h1>
    <h1 class="mt-2 text-gray-700 dark:text-gray-200">Eduardo Dutra</h1>
    <h1 class="mt-2 text-gray-700 dark:text-gray-200"># 0001</h1>
</div>




  
</div>

      </div>

      {/* Segunda caja */}
      <div className="flex-1 max-w-2xl px-4 py-3 bg-white border border-red rounded-md shadow-md dark:bg-gray-800">
        {/* Contenido de la segunda caja */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-medium text-red dark:text-red">Ultimo Retiro</span>    
          <span className="px-3 py-1 text-xs text-blue-800 uppercase bg-red rounded-full dark:bg-blue-300 text-white">11109757</span>
    </div>
    <div class="flex mt-4">
  <div class="w-1/2">
    <h1 className="flex items-center mt-2 text-gray-700 dark:text-gray-200">Saldo Retirado</h1>
    <h1 className="flex items-center mt-2 text-gray-700 dark:text-gray-200">Fecha</h1>
    <h1 className="flex items-center mt-2 text-gray-700 dark:text-gray-200">Hora</h1>
    <h1 className="flex items-center mt-2 text-gray-700 dark:text-gray-200">Cajero</h1>
    <h1 className="flex items-center mt-2 text-gray-700 dark:text-gray-200">Id de Cajero </h1>
  </div>
  <div class="w-1/2 flex flex-col justify-between items-end text-center">
    <h1 class="mt-2 text-gray-700 dark:text-gray-200">23.000.000</h1>
    <h1 class="mt-2 text-gray-700 dark:text-gray-200">01/06/2024</h1>
    <h1 class="mt-2 text-gray-700 dark:text-gray-200">8:20 AM</h1>
    <h1 class="mt-2 text-gray-700 dark:text-gray-200">Eduardo Dutra</h1>
    <h1 class="mt-2 text-gray-700 dark:text-gray-200"># 0001</h1>
</div>
</div>
</div>
</div>

   
  );
};

export default Transactions;
