"use client";

import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { DonaCeciContext } from "@/context/DonaCeciContext";

const MenuHamburguesa = () => {
  const { isOpenMenuHamburguesa, setIsOpenMenuHamburguesa } =
    useContext(DonaCeciContext);

  const enlaces = [
    {
      nombre: "Inicio",
      link: "/",
    },
    {
      nombre: "Carta",
      link: "/carta",
    },
    {
      nombre: "Contacto",
      link: "/contacto",
    },
  ];

  return (
    <AnimatePresence>
      {isOpenMenuHamburguesa && (
        <div
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 h-screen w-screen"
          onClick={() => setIsOpenMenuHamburguesa(false)}
        >
          <motion.div
            className="relative z-10 w-96 flex flex-col items-start bg-black shadow-lg rounded-md p-4 font-roboto text-white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {enlaces.map((enlace, index) => (
              <Link
                key={index}
                href={enlace.link}
                className="w-full text-left px-4 py-2 hover:text-[#eec802] transition-colors active:scale-95 duration-75"
                onClick={() => setIsOpenMenuHamburguesa(false)}
              >
                {enlace.nombre}
              </Link>
            ))}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MenuHamburguesa;
