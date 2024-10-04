// Función para formatear el costo a miles sin decimales.

export function saldoFormatter(saldo) {
  // Crea una instancia de Intl.NumberFormat con la configuración regional "es-CO" (Colombia)
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  });

  // Formatea el costo usando la configuración especificada.
  return formatter.format(saldo);
}
