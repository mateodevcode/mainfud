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
        className="flex flex-row justify-between items-start pt-6 w-8/12 mt-20 gap-10 mb-40"
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
          <div className="w-5/12 h-full" onClick={(e) => e.stopPropagation()}>
            <video
              src="/section/section2-video.mp4"
              autoPlay
              loop
              className="w-full h-full object-cover"
            ></video>
          </div>
        </div>
      )}
      <div className="absolute -bottom-12 flex items-center justify-center w-full rotate-180 z-10">
        <Image
          src={"/divisor/divisor.png"}
          alt={"divisor"}
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Restaurante;
