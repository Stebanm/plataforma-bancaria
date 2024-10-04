import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import ChipCard from "../../../../assets/Img/Client/chip.png";
import Logo from "../../../../assets/Img/Logos/ClarBank LogoOnly.svg";
import { ClientMovimientos } from "./ClientMovimientos";
import { AllTarjets } from "./AllTarjets";
import { saldoFormatter } from "../../../../utils/saldoFormatter";

export const ClientView = ({
  isLoggedIn,
  userData,
  contenidoCliente,
  setContenidoCliente,
}) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  const [allMovimientos, setAllMovimientos] = useState([]);

  const handleSetAllMovimientos = (movimientos) => {
    setAllMovimientos(movimientos);
  };

  const autorizedAccounts = userData.filter(
    (data) => data.estado_cuenta === "Autorizado"
  );

  useEffect(() => {
    if (!isLoggedIn) {
      // Limpiar la cookie al cerrar sesión
      Cookies.remove("selectedAccount");
      setSelectedAccount(null);
      return;
    }

    if (autorizedAccounts && autorizedAccounts.length > 0) {
      const storedAccount = Cookies.get("selectedAccount");
      if (storedAccount) {
        setSelectedAccount(JSON.parse(storedAccount));
      } else {
        const initialAccount = autorizedAccounts[0];
        setSelectedAccount(initialAccount);
        Cookies.set("selectedAccount", JSON.stringify(initialAccount), {
          expires: 7,
        }); // La cookie expira en 7 días
      }
      setLoading(false);
    }
  }, [userData, isLoggedIn]);

  useEffect(() => {
    if (selectedAccount) {
      Cookies.set("selectedAccount", JSON.stringify(selectedAccount), {
        expires: 7,
      }); // La cookie expira en 7 días
    }
  }, [selectedAccount]);

  return (
    <>
      <section style={{ minHeight: "80vh" }}>
        <h1 className="text-2xl font-semibold">Inicio</h1>
        {loading ? (
          <p>Cargando datos...</p>
        ) : (
          <div className="flex flex-wrap gap-4 ">
            <div className="w-full md:flex-auto md:w-0">
              <ul className="flex flex-col gap-x-4">
                <li>
                  <div className="flex flex-col justify-between items-start gap-6 mx-auto p-4 bg-white rounded sm:flex-row sm:items-center">
                    <div className="py-6 px-8 flex flex-col gap-4 w-full bg-gradient-to-r from-teal-600 to-teal-300 shadow-xl relative rounded-lg sm:w-96">
                      <div>
                        <img src={Logo} alt="ClarkBank" className="h-10" />
                      </div>
                      <div className="flex items-center justify-between gap-5">
                        <div className="text-xl md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl  font-semibold text-white">
                          {selectedAccount.num_cuenta}
                        </div>

                        <img className="h-10" src={ChipCard} alt="" />
                      </div>
                      <div className="flex flex-col items-start justify-center text-muted-foreground text-md text-white">
                        <div>{selectedAccount.descripcion}</div>
                        <div>
                          {selectedAccount.nombre}{" "}
                          {selectedAccount.ip_primerApellido}{" "}
                          {selectedAccount.ip_segundoApellido}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 flex-auto">
                      <div className="bg-card rounded-lg p-6 flex items-center justify-between">
                        <div className="text-muted-foreground text-xl md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-medium">
                          Saldo total
                        </div>
                        <div className="text-xl md:text-lg lg:text-3xl xl:text-2xl 2xl:text-3xl  font-bold">
                          {saldoFormatter(selectedAccount.saldo)}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              <AllTarjets
                userData={userData}
                contenidoCliente={contenidoCliente}
                onSelectAccount={setSelectedAccount}
              />
            </div>

            <ClientMovimientos
              userData={userData}
              contenidoCliente={contenidoCliente}
              setAllMovimientos={handleSetAllMovimientos}
              setContenidoCliente={setContenidoCliente}
            />
          </div>
        )}
      </section>
    </>
  );
};
