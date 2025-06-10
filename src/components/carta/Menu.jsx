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
    <div className="absolute left-80 top-14 h-[93%] right-10 overflow-y-scroll gap-2 p-4 flex flex-wrap items-start justify-start">
      {itemSeleccionado === "Empanadas" && (
        <>
          {empanadas.map((producto) => (
            <div
              key={producto.id}
              onClick={() => {
                setProductoSeleccionado(producto);
                setModalOpenProductoSeleccionado(true);
              }}
              className="p-2 text-white transition-colors bg-black rounded-md font-roboto select-none w-56 flex flex-col items-start justify-start gap-2"
            >
              <div className="bg-zinc-100 w-full h-52 rounded-lg p-8">
                <Image
                  src={producto.image}
                  alt={producto.nombre}
                  width={240}
                  height={200}
                  className="w-full h-full object-cover rounded-lg shadow-png hover:scale-125 transition-transform duration-500"
                />
              </div>
              <span className="font-bold h-10">{producto.nombre}</span>
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
              className="p-2 text-white transition-colors bg-black rounded-md font-roboto select-none w-56 flex flex-col items-start justify-start gap-2"
            >
              <div className="bg-zinc-100 w-full h-52 rounded-lg p-8">
                <Image
                  src={producto.image}
                  alt={producto.nombre}
                  width={240}
                  height={200}
                  className="w-full h-full object-cover rounded-lg shadow-png hover:scale-125 transition-transform duration-500"
                />
              </div>
              <span className="font-bold h-10">{producto.nombre}</span>
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
              className="p-2 text-white transition-colors bg-black rounded-md font-roboto select-none w-56 flex flex-col items-start justify-start gap-2"
            >
              <div className="bg-zinc-100 w-full h-52 rounded-lg p-8">
                <Image
                  src={producto.image}
                  alt={producto.nombre}
                  width={240}
                  height={200}
                  className="w-full h-full object-cover rounded-lg shadow-png hover:scale-125 transition-transform duration-500"
                />
              </div>
              <span className="font-bold h-10">{producto.nombre}</span>
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
