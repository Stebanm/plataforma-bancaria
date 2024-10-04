// Función para formatear la fecha en "dd/mm/yyyy hh:mm:ss a.m./p.m.".

export function dateFormatter(fecha) {
  const date = new Date(fecha);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("es-CO", options).format(date);
}
