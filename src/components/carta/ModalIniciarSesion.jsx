"use client";

import { DonaCeciContext } from "@/context/DonaCeciContext";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect } from "react";
import IniciarSesion from "../iniciar-sesion/IniciarSesion";
import { IoClose } from "react-icons/io5";

const ModalIniciarSesion = () => {
  const { modalOpenIniciarSesion, setModalOpenIniciarSesion } =
    useContext(DonaCeciContext);

  useEffect(() => {
    if (modalOpenIniciarSesion) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modalOpenIniciarSesion]);

  return (
    <AnimatePresence>
      {modalOpenIniciarSesion && (
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
          onClick={() => setModalOpenIniciarSesion(false)}
        >
          <motion.div
            className="relative z-10 w-11/12 md:w-7/12 lg:w-[450px] flex flex-col items-center justify-center bg-[#fff] shadow-lg rounded-md p-4 font-roboto"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div
              className="absolute top-4 right-4 cursor-pointer rounded-full bg-black/20 hover:bg-black/30 transition-colors duration-200 p-2"
              onClick={() => setModalOpenIniciarSesion(false)}
            >
              <IoClose className="text-2xl text-white" />
            </div>
            <IniciarSesion />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalIniciarSesion;
