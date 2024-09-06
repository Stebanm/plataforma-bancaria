import React from "react";
import nomina from "../../../assets/Img/Carousel/nomina.png";
import ahorro from "../../../assets/Img/Carousel/cuenta-ahorros.png";
import credito from "../../../assets/Img/Carousel/credito.png";

export const MainContainer = () => {
  return (
    <>
      <section className="mx-4 md:mx-12 lg:mx-20 xl:mx-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img
            src={nomina}
            alt="Cuentas Nómina"
            className="w-20 mx-auto md:mx-0"
          />
          <h3 className="text-xl font-semibold mb-2">Cuentas de Nómina</h3>
          <p className="text-muted-foreground">
            ¡Descubre el poder de una cuenta de nómina diseñada para simplificar
            tu vida financiera! En un mundo lleno de opciones, ¿por qué
            conformarse con lo común cuando puedes experimentar la excelencia
            con nuestros servicios de cuenta de nómina?
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img src={credito} alt="Créditos" className="w-20 mx-auto md:mx-0" />
          <h3 className="text-xl font-semibold mb-2">Créditos</h3>
          <p className="text-muted-foreground">
            ¡Desata tu potencial financiero con nuestros servicios de créditos a
            medida! En la travesía hacia tus metas, no dejes que las barreras
            financieras te detengan. Con nuestro exclusivo servicio de créditos,
            te ofrecemos una llave hacia oportunidades ilimitadas.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img
            src={ahorro}
            alt="Cuentas de Ahorros"
            className="w-20 mx-auto md:mx-0"
          />
          <h3 className="text-xl font-semibold mb-2">Cuentas de Ahorros</h3>
          <p className="text-muted-foreground">
            Entra en un mundo de estabilidad financiera y crecimiento con
            nuestra cuenta de ahorros. ¿Te has preguntado alguna vez cómo sería
            tener un respaldo financiero sólido para tus proyectos futuros? Con
            nuestra cuenta de ahorros, estás a un paso de lograrlo.
          </p>
        </div>
      </section>
    </>
  );
};
