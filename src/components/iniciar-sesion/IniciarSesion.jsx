import Logo from "../principal/logo/Logo";
import { FormIniciarSesion } from "./FormIniciarSesion";

export default function IniciarSesion() {
  return (
    <div
      className=""
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex justify-center gap-2">
        <Logo />
      </div>
      <FormIniciarSesion />
    </div>
  );
}
