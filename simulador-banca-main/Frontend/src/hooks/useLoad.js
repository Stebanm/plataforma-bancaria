import { useState, useEffect } from "react";

const useLoadingState = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simula una operación asincrónica con un tiempo de espera de 2 segundos
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error durante la carga:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // El segundo parámetro es un array de dependencias, vacío para que se ejecute solo una vez al montar el componente

  return { loading };
};

export default useLoadingState;
