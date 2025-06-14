"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const TiposDeEmpanadas = () => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white relative z-10">
      <div className="flex flex-col justify-center items-center py-5 md:py-20 w-10/12 md:w-8/12">
        <h2 className="text-4xl md:text-6xl font-bold text-center text-[#965511]">
          Tipos de Empanadas
        </h2>

        <div className="flex flex-col items-center justify-center pt-6 w-full">
          <p className="text-lg text-center text-gray-700 w-full mt-5 font-roboto">
            En Doña Ceci ofrecemos una variedad de empanadas que son el deleite
            de nuestros clientes. Desde las clásicas empanadas de carne hasta
            opciones vegetarianas, cada bocado es una explosión de sabor.
          </p>
          <Image
            src="/section/section1.png"
            alt="Empanadas"
            width={1000}
            height={1000}
            className="w-[700px] mt-10"
            style={{ filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3))" }}
          />
        </div>
        <button
          className="bg-[#eec802] hover:bg-[#eec802]/50 text-amber-900 font-medium px-4 py-2 my-4 cursor-pointer select-none w-28 active:scale-95 transition-colors duration-300 mt-10"
          onClick={() => router.push("/carta")}
        >
          Ver Carta
        </button>
      </div>
    </div>
  );
};

export default TiposDeEmpanadas;
