"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import Contacto from "./modal-realizar-pedido/Contacto";
import { datosDonaCeci } from "@/data/donaceci";
import { DonaCeciContext } from "@/context/DonaCeciContext";

const Navbar = () => {
  const { setModalOpenRealizarPedido, setPaso1, setPaso2 } =
    useContext(DonaCeciContext);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <nav className="w-11/12 md:w-10/12 lg:w-8/12 flex items-center justify-between">
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
        <div className="hidden lg:flex items-center gap-8 text-white font-roboto">
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
        {/* <ModalRealizarPedido /> */}
        <button
          className="bg-[#eec802] hover:bg-[#eec802]/50 text-amber-900 font-medium px-4 py-2 text-sm cursor-pointer select-none active:scale-95 transition-colors duration-300 animate-pulse"
          onClick={() => {
            setModalOpenRealizarPedido(true);
            setPaso1(true);
            setPaso2(false);
          }}
        >
          Realizar Pedido
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
