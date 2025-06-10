const BadgeEstado = ({ estado }) => {
  const getBadgeStyles = () => {
    switch (estado) {
      case "pendiente":
        return "border-amber-500 bg-amber-200 text-amber-500";
      case "terminado":
        return "border-green-500 bg-green-200 text-green-500";
      case "cancelado":
        return "border-red-500 bg-red-200 text-red-500";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <span
      className={`text-xs  font-semibold  px-4 py-1 rounded-full border-[1px] select-none ${getBadgeStyles()}`}
    >
      {estado}
    </span>
  );
};

export default BadgeEstado;
