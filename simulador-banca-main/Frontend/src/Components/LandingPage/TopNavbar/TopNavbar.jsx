import React from "react";
import { Link } from "react-router-dom";
import TopLogo from "../../../assets/Img/Logos/ClarBank LogoOnly.svg";
import nameLogo from "../../../assets/Img/Logos/ClarBank Name.svg";

export const TopNavbar = () => {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-xl">
        <div className="max-w-screen-x flex flex-wrap items-center justify-between mx-auto py-4 px-6 border-b border-gray">
          <Link
            to="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={TopLogo} className="h-10" alt="ClarBank" />
            <span>
              <img src={nameLogo} className="h-4" alt="" />
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link to="/Login">
              <button className="px-3 md:px-5 py-2 text-md font-regular text-white transition-colors duration-300 transform bg-emerald-600 rounded-lg hover:bg-emerald-700">
                Iniciar Sesión
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
