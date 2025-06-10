"use client";

import { DonaCeciContext } from "@/context/DonaCeciContext";
import Image from "next/image";
import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ModalIdioma = () => {
  const { setModalOpenIdioma, modalOpenIdioma, setIdioma, idioma } =
    useContext(DonaCeciContext);

  return (
    <AnimatePresence>
      {modalOpenIdioma && (
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
          onClick={() => setModalOpenIdioma(false)}
        >
          <motion.div
            className="absolute top-14 right-6 gap-1 z-10 w-28 flex flex-col items-center bg-black shadow-lg rounded-md"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div
              className={`flex items-center gap-1 text-sm text-white  w-full px-4 py-2 cursor-pointer select-none hover:bg-white/10 transition-colors duration-200 ${
                idioma === "Español" ? "bg-white/10" : ""
              }`}
              onClick={() => {
                setIdioma("Español");
                setModalOpenIdioma(false);
              }}
            >
              <Image
                src="/idioma/colombia.png"
                alt="Español"
                width={200}
                height={200}
                className="inline-block mr-1 w-5"
              />
              <span>Español</span>
            </div>
            <div
              className={`flex items-center gap-1 text-sm text-white  w-full px-4 py-2 cursor-pointer select-none hover:bg-white/10 transition-colors duration-200 ${
                idioma === "ingles" ? "bg-white/10" : ""
              }`}
              onClick={() => {
                setIdioma("ingles");
                setModalOpenIdioma(false);
              }}
            >
              <Image
                src="/idioma/usa.png"
                alt="Español"
                width={200}
                height={200}
                className="inline-block mr-1 w-5"
              />
              <span>Ingles</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalIdioma;
