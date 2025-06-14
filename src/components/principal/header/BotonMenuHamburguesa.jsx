"use client";

import { DonaCeciContext } from "@/context/DonaCeciContext";
import React, { useContext } from "react";

const BotonMenuHamburguesa = () => {
  const { isOpenMenuHamburguesa, setIsOpenMenuHamburguesa } =
    useContext(DonaCeciContext);
  return (
    <button
      className="hamburger-button flex md:hidden"
      onClick={() => setIsOpenMenuHamburguesa(!isOpenMenuHamburguesa)}
      aria-label="Toggle menu"
    >
      <svg
        width="40"
        height="24"
        viewBox="0 0 40 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className=""
      >
        {/* Línea superior */}
        <rect
          className={`line top ${isOpenMenuHamburguesa ? "active" : ""}`}
          x="4"
          y="6"
          width="30"
          height="2"
          rx="1"
        />

        {/* Línea inferior */}
        <rect
          className={`line bottom ${isOpenMenuHamburguesa ? "active" : ""}`}
          x="4"
          y="16"
          width="30"
          height="2"
          rx="1"
        />
      </svg>
    </button>
  );
};

export default BotonMenuHamburguesa;
