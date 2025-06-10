"use client";

import { formatoDinero } from "@/lib/formatoDinero";
import Image from "next/image";
import { useState } from "react";

export default function Pedidos({ ordenCompleta }) {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="w-full">
      {ordenCompleta?.listaPedidos.map((item, index) => (
        <div key={index} className={`border-b-[2px] border-black`}>
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openItem === item.id ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <span className="font-semibold">{item.pedido}</span>
            </div>
            <span className="font-semibold">{formatoDinero(item.total)}</span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openItem === item.id
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-4 text-black text-sm leading-relaxed">
              {/* {item.content} */}
              {item?.items.map((pedido, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 text-sm w-full px-4 py-2 select-none"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={pedido.image || "/productos/empanada.png"}
                      alt={pedido.nombre || "Empanada"}
                      width={50}
                      height={50}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div className="text-xs bg-[#eec802] text-black p-1 flex items-center gap-1 -ml-5 rounded-full">
                      <span>x</span>{" "}
                      <span className="font-semibold">{pedido.cantidad}</span>
                    </div>
                    <span className="text-sm font-roboto">{pedido.nombre}</span>
                  </div>
                  <span className="bg-[#eec802] text-black px-2 rounded-full font-semibold">
                    {formatoDinero(pedido.precio)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
