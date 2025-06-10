"use client";

import { DonaCeciContext } from "@/context/DonaCeciContext";
import { formatoDinero } from "@/lib/formatoDinero";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";

const ModalProductoSeleccionado = () => {
  const {
    modalOpenProductoSeleccionado,
    setModalOpenProductoSeleccionado,
    productoSeleccionado,
    agregarProducto,
  } = useContext(DonaCeciContext);

  return (
    <AnimatePresence>
      {modalOpenProductoSeleccionado && (
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
          onClick={() => setModalOpenProductoSeleccionado(false)}
        >
          <motion.div
            className="relative z-10 w-96 flex flex-col items-start bg-black shadow-lg rounded-md p-4 font-roboto text-white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div
              className={`flex flex-col items-center gap-1 text-sm w-full px-4 py-2 bg-zinc-100 rounded-md`}
              onClick={() => {}}
            >
              <Image
                src={productoSeleccionado?.image}
                alt="Español"
                width={500}
                height={500}
                className="inline-block mr-1 w-96 select-none"
              />
            </div>
            <h2 className="my-5 text-xl font-semibold">
              {productoSeleccionado?.nombre}
            </h2>
            <div className="text-sm text-gray-300 mb-4">
              <span className="font-semibold">Ingredientes:</span>{" "}
              <span>Empanada de pollo con verduras arroz faba espagietti</span>
            </div>
            <span className="mb-4">
              precio:{" "}
              <span className="font-bold">
                {formatoDinero(productoSeleccionado?.precio)}
              </span>
            </span>
            <button
              className="w-full bg-[#eec802] text-black px-4 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer active:scale-95 hover:bg-[#eec802]/50 select-none"
              onClick={(e) => {
                e.stopPropagation();
                agregarProducto(productoSeleccionado);
              }}
            >
              Añadir
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalProductoSeleccionado;
