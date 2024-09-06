import React from "react";

export const Pagination = ({
  movementsPage,
  movementsTotal,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(movementsTotal / movementsPage);
  const pageNumbers = [];

  const createPageNumbers = () => {
    if (totalPages <= 5) {
      // Si hay 5 o menos páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Mostrar las páginas de forma resumida
      if (currentPage > 3) {
        pageNumbers.push(1);
        if (currentPage > 4) pageNumbers.push("...");

        // Mostrar las páginas alrededor de currentPage
        for (
          let i = Math.max(2, currentPage - 1);
          i <= Math.min(totalPages - 1, currentPage + 1);
          i++
        ) {
          pageNumbers.push(i);
        }

        if (currentPage < totalPages - 2) pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else {
        // Si estamos en las primeras páginas
        for (let i = 1; i <= Math.min(4, totalPages); i++) {
          pageNumbers.push(i);
        }
        if (totalPages > 4) pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
  };

  createPageNumbers();

  const onPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const onSpecifyPage = (numberPage) => {
    if (numberPage !== "...") {
      setCurrentPage(numberPage);
    }
  };

  return (
    <div className="w-full mt-6">
      <div className="flex justify-center items-center ">
        <button
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 capitalize bg-white rounded-md dark:bg-gray-800 dark:text-gray-600 ${
            currentPage === 1
              ? "cursor-not-allowed text-gray-500"
              : "text-gray-700 hover:text-white hover:bg-emerald-700"
          }`}
          onClick={onPreviousPage}
        >
          <div className="flex items-center -mx-1">
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
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            <span className="mx-1">Regresar</span>
          </div>
        </button>

        <div className="hidden sm:flex">
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => onSpecifyPage(page)}
              className={`px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-emerald-700 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-gray-200 ${
                page === currentPage
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-700"
              }`}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          disabled={currentPage >= totalPages}
          className={`px-4 py-2 mx-1 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-blue-600 dark:hover:text-gray-200 ${
            currentPage >= totalPages
              ? "cursor-not-allowed text-gray-500"
              : "text-gray-700 hover:text-white hover:bg-emerald-700"
          }`}
          onClick={onNextPage}
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Siguiente</span>
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
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};
