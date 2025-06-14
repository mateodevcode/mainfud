"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GaleriaImg = () => {
  const images = [
    "/productos/img-1.png",
    "/productos/img-2.png",
    "/productos/img-3.png",
    "/productos/img-4.png",
    "/productos/img-5.png",
  ];

  const [openModalImagen, setOpenModalImagen] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  return (
    <>
      {/* Galería de imágenes */}
      <div className="bg-white w-full flex flex-col items-center justify-start select-none">
        <div className="w-11/12 md:w-8/12 lg:w-6/12 p-4 mt-20">
          <h2 className="text-7xl font-divertida">Restaurante Doña Ceci</h2>
          <p className="text-lg text-black mt-4 font-roboto">
            En el corazón del sabor colombiano, Doña Ceci ofrece las empanadas
            más tradicionales y sabrosas que puedas imaginar. Hechas con amor,
            recetas caseras y una sazón inconfundible, cada bocado es un viaje a
            nuestras raíces. Ya sea para disfrutar en el restaurante o llevarlas
            congeladas a casa, las empanadas de Doña Ceci son perfectas para
            compartir, sorprender o simplemente consentirte.{" "}
            <strong className="text-xl">
              ¡Ven y déjate conquistar por el auténtico sabor de Colombia!
            </strong>
          </p>
        </div>
        <div className="w-11/12 md:w-8/12 lg:w-6/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 my-20">
          {images.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Imagen ${i + 1}`}
              className="w-full h-full object-cover cursor-pointer bg-zinc-200"
              width={300}
              height={300}
              onClick={() => {
                setOpenModalImagen(true);
                setImagenSeleccionada(src);
              }}
            />
          ))}
        </div>
      </div>

      {/* Modal Full Screen */}
      <AnimatePresence>
        {openModalImagen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenModalImagen(false)}
          >
            <motion.div
              className="relative w-[600px] h-[600px] flex items-center justify-center rounded-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer click en la imagen
            >
              <Image
                src={imagenSeleccionada}
                alt="Vista previa"
                width={1200}
                height={800}
                className="object-contain max-w-full max-h-screen"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GaleriaImg;
