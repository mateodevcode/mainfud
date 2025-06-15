"use client";

import { DonaCeciContext } from "@/context/DonaCeciContext";
import { formatoDinero } from "@/lib/formatoDinero";
import Image from "next/image";
import React, { useContext } from "react";

const Menu = () => {
  const {
    empanadas,
    bebidas,
    postres,
    itemSeleccionado,
    agregarProducto,
    setModalOpenProductoSeleccionado,
    setProductoSeleccionado,
  } = useContext(DonaCeciContext);

  return (
    <div className="absolute left-0 md:left-80 top-12 right-0 md:right-10 md:overflow-y-scroll gap-2 p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 items-start justify-items-center bg-[#FDF9E5]">
      {itemSeleccionado === "Empanadas" && (
        <>
          {empanadas.map((producto) => (
            <div
              key={producto.id}
              onClick={() => {
                setProductoSeleccionado(producto);
                setModalOpenProductoSeleccionado(true);
              }}
              className="p-2 text-white transition-colors bg-black rounded-md font-roboto select-none flex flex-col items-start justify-start gap-2"
            >
              <div className="bg-zinc-100 w-full rounded-lg p-8">
                <Image
                  src={producto.image}
                  alt={producto.nombre}
                  width={240}
                  height={200}
                  className="w-32 h-32 object-cover rounded-lg shadow-png hover:scale-125 transition-transform duration-500"
                />
              </div>
              <span className="font-bold h-10 text-sm md:text-base">
                {producto.nombre}
              </span>
              <span>{formatoDinero(producto.precio)}</span>
              <button
                className="w-full bg-[#eec802] text-black px-4 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer active:scale-95 hover:bg-[#eec802]/50"
                onClick={(e) => {
                  e.stopPropagation();
                  agregarProducto(producto);
                }}
              >
                Añadir
              </button>
            </div>
          ))}
        </>
      )}
      {itemSeleccionado === "Bebidas" && (
        <>
          {bebidas.map((producto) => (
            <div
              key={producto.id}
              onClick={() => {
                setProductoSeleccionado(producto);
                setModalOpenProductoSeleccionado(true);
              }}
              className="p-2 text-white transition-colors bg-black rounded-md font-roboto select-none flex flex-col items-start justify-start gap-2"
            >
              <div className="bg-zinc-100 w-full rounded-lg p-8">
                <Image
                  src={producto.image}
                  alt={producto.nombre}
                  width={240}
                  height={200}
                  className="w-32 h-32 object-cover rounded-lg shadow-png hover:scale-125 transition-transform duration-500"
                />
              </div>
              <span className="font-bold h-10 text-sm md:text-base">
                {producto.nombre}
              </span>
              <span>{formatoDinero(producto.precio)}</span>
              <button
                className="w-full bg-[#eec802] text-black px-4 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer active:scale-95 hover:bg-[#eec802]/50"
                onClick={(e) => {
                  e.stopPropagation();
                  agregarProducto(producto);
                }}
              >
                Añadir
              </button>
            </div>
          ))}
        </>
      )}
      {itemSeleccionado === "Postres" && (
        <>
          {postres.map((producto) => (
            <div
              key={producto.id}
              onClick={() => {
                setProductoSeleccionado(producto);
                setModalOpenProductoSeleccionado(true);
              }}
              className="p-2 text-white transition-colors bg-black rounded-md font-roboto select-none flex flex-col items-start justify-start gap-2"
            >
              <div className="bg-zinc-100 w-full rounded-lg p-8">
                <Image
                  src={producto.image}
                  alt={producto.nombre}
                  width={240}
                  height={200}
                  className="w-32 h-32 object-cover rounded-lg shadow-png hover:scale-125 transition-transform duration-500"
                />
              </div>
              <span className="font-bold h-10 text-sm md:text-base">
                {producto.nombre}
              </span>
              <span>{formatoDinero(producto.precio)}</span>
              <button
                className="w-full bg-[#eec802] text-black px-4 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer active:scale-95 hover:bg-[#eec802]/50"
                onClick={(e) => {
                  e.stopPropagation();
                  agregarProducto(producto);
                }}
              >
                Añadir
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Menu;
