import Image from "next/image";
import React from "react";

const TiposDeEmpanadas = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white relative">
      <div className="flex flex-col justify-center items-center pt-20 w-8/12 pb-20">
        <h2 className="text-6xl font-bold text-center text-[#965511]">
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
          />
        </div>
        <button className="bg-[#eec802] hover:bg-[#eec802]/50 text-amber-900 font-medium px-4 py-2 my-4 cursor-pointer select-none w-28 active:scale-95 transition-colors duration-300 mt-10">
          Ver Carta
        </button>
      </div>

      <div className="absolute -bottom-12 flex items-center justify-center w-full z-20 rotate-180">
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

export default TiposDeEmpanadas;
