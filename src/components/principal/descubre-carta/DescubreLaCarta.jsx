"use client";

import { DonaCeciContext } from "@/context/DonaCeciContext";
import React, { useContext } from "react";

const DescubreLaCarta = () => {
  const { router } = useContext(DonaCeciContext);

  return (
    <div className="flex flex-col items-center justify-center w-full mb-20">
      <div className="w-11/12 md:w-8/12 flex flex-col items-center justify-center my-20">
        <span className="text-xl md:text-2xl text-center text-white my-4 w-10/12 md:w-8/12">
          Restaurante de empanadas artesanales 🥟
        </span>
        <h2 className="text-8xl md:text-9xl text-center mb-5 font-divertida text-white">
          Doña Ceci
        </h2>
        <button
          className="bg-[#eec802] hover:bg-[#eec802]/50 text-amber-900 font-medium px-4 py-2 my-4 cursor-pointer select-none active:scale-95 transition-colors duration-300 animate-bounce"
          onClick={() => router.push("/carta")}
        >
          Descubre nuestra carta
        </button>
      </div>
    </div>
  );
};

export default DescubreLaCarta;
