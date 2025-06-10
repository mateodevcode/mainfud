export const formatoFecha = (fecha) => {
  if (!fecha) return "";

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Date(fecha).toLocaleDateString("es-ES", options);
};
