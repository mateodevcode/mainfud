"use client";

import SideBar from "./SideBar";
import Header from "./Header";
import Menu from "./Menu";
import ModalIdioma from "./ModalIdioma";
import ModalListaArticulos from "./ModalListaArticulos";
import ModalProductoSeleccionado from "./ModalProductoSeleccionado";
import ModalIniciarSesion from "./ModalIniciarSesion";
import { usePathname, useSearchParams } from "next/navigation";
import PaginaQR from "../QRScanner/PaginaQR";
import { useContext, useEffect } from "react";
import { DonaCeciContext } from "@/context/DonaCeciContext";
import Loading from "../loading/Loading";
import { useSession } from "next-auth/react";

const Carta = () => {
  const pathname = usePathname();
  const { mesa, setMesa, orden } = useContext(DonaCeciContext);
  const getmesa = useSearchParams().get("mesa");
  const { status } = useSession();

  useEffect(() => {
    if (getmesa) {
      setMesa(getmesa);
    }
  }, [getmesa, setMesa]);

  return (
    <>
      {pathname.includes("carta") && !mesa && !getmesa && !orden && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-white flex flex-col items-center justify-center gap-4 my-10 bg-black/50 p-20 rounded-md">
            <PaginaQR size={"w-32 h-32"} />
            <span className="text-3xl font-semibold">
              Haz click en el código QR
            </span>
            <span className="text-2xl">Disfruta de nuestro menu.</span>
          </div>
        </div>
      )}

      <div className="w-full h-screen flex flex-col items-center bg-[#eec802]">
        <Header />
        <div className="w-full flex flex-row items-start justify-between">
          <SideBar />
          <Menu />
        </div>
      </div>

      {/* Modal de idiomas */}
      <ModalIdioma />

      {/* Modal de Lista de productos */}
      <ModalListaArticulos />

      {/* Modal de producto seleccionado */}
      <ModalProductoSeleccionado />

      {/* Modal de iniciar sesión */}
      <ModalIniciarSesion />

      {/* Cargar loading */}
      {true && (
        <div className="absolute inset-0 z-50">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Carta;
