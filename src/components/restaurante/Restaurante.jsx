"use client";

import React, { use, useEffect, useState } from "react";
import Section1 from "./section1/Section1";
import Section2 from "./section1/Section2";
import Image from "next/image";

const Restaurante = () => {
  const [abrirVideo, setAbrirVideo] = useState(false);
  useEffect(() => {
    if (abrirVideo) {
      const timer = setTimeout(() => {
        setAbrirVideo(false);
      }, 25000); // Cierra el video después de 25 segundos

      return () => clearTimeout(timer); // Limpia el timeout si se desmonta antes
    }
  }, [abrirVideo]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setAbrirVideo(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-white w-full flex flex-col items-center justify-center relative">
      <div
        className="flex flex-col lg:flex-row justify-between items-start pt-6 w-10/12 md:w-8/12 mt-20 gap-10 mb-20"
        id="el-restaurante"
      >
        <Section1 />
        <Section2 setAbrirVideo={setAbrirVideo} />
      </div>
      {abrirVideo && (
        <div
          className="fixed inset-0 flex items-center justify-center z-30 bg-black/50"
          onClick={() => setAbrirVideo(false)}
        >
          <div
            className="w-full md:w-10/12 lg:w-5/12 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="/section/section2-video.mp4"
              autoPlay
              loop
              className="w-full h-full object-cover"
            ></video>
          </div>

          <button
            className="flex lg:hidden absolute top-4 right-4 md:right-20 text-white text-xl bg-red-600 rounded-full px-2 hover:bg-red-700 transition-colors duration-300"
            onClick={() => setAbrirVideo(false)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Restaurante;
