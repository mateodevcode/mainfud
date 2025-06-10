import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <nav className="w-11/12 md:w-8/12 flex items-center justify-between">
        {/* Social Icons */}
        <div className="flex gap-4">
          <FaFacebook className="w-5 h-5 text-white hover:text-[#eec802] cursor-pointer" />
          <Link href="https://www.instagram.com/donacecie/" target="_blank">
            <FaInstagram className="w-5 h-5 text-white hover:text-[#eec802] cursor-pointer" />
          </Link>
          <FaTiktok className="w-5 h-5 text-white hover:text-[#eec802] cursor-pointer" />
        </div>
        {/* Menu Items */}
        <div className="hidden md:flex items-center gap-8 text-white font-roboto">
          <a
            href="#"
            className="hover:text-[#eec802] transition-colors active:scale-95 duration-75"
          >
            Inicio
          </a>
          <a
            href="#"
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
          <a
            href="#"
            className="hover:text-[#eec802] transition-colors active:scale-95 duration-75"
          >
            Contacto
          </a>
        </div>
        <button className="bg-[#eec802] hover:bg-[#eec802]/50 text-amber-900 font-medium px-4 py-2 text-sm cursor-pointer select-none active:scale-95 transition-colors duration-300">
          Realizar Pedido
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
