import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import ModalRealizarPedido from "./modal-realizar-pedido/ModalRealizarPedido";
import Contacto from "./modal-realizar-pedido/Contacto";
import { datosDonaCeci } from "@/data/donaceci";

const Navbar = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <nav className="w-11/12 md:w-8/12 flex items-center justify-between">
        {/* Social Icons */}
        <div className="flex gap-4">
          <Link href={datosDonaCeci.redes_sociales.facebook} target="_blank">
            <FaFacebook className="w-5 h-5 text-white hover:text-[#eec802] cursor-pointer" />
          </Link>
          <Link href={datosDonaCeci.redes_sociales.instagram} target="_blank">
            <FaInstagram className="w-5 h-5 text-white hover:text-[#eec802] cursor-pointer" />
          </Link>
          <Link href={datosDonaCeci.redes_sociales.tiktok} target="_blank">
            <FaTiktok className="w-5 h-5 text-white hover:text-[#eec802] cursor-pointer" />
          </Link>
        </div>
        {/* Menu Items */}
        <div className="hidden md:flex items-center gap-8 text-white font-roboto">
          <a
            href="/"
            className="hover:text-[#eec802] transition-colors active:scale-95 duration-75"
          >
            Inicio
          </a>
          <a
            href="#el-restaurante"
            className="hover:text-[#eec802] transition-colors active:scale-95 duration-75"
          >
            El Restaurante
          </a>
          <a
            href="/carta"
            className="hover:text-[#eec802] transition-colors active:scale-95 duration-75"
          >
            Carta
          </a>
          <Contacto />
        </div>
        <ModalRealizarPedido />
      </nav>
    </div>
  );
};

export default Navbar;
