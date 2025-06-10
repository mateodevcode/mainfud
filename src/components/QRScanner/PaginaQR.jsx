"use client";

import { useEffect, useState } from "react";
import QRScannerModal from "./QRScannerModal";
import { LuQrCode } from "react-icons/lu";

export default function PaginaQR() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [resultadoQR, setResultadoQR] = useState(null);

  const manejarResultadoQR = (valor) => {
    setResultadoQR(valor);
    setModalAbierto(false); // Cierra el modal al escanear
  };

  useEffect(() => {
    if (!resultadoQR) return;

    const url = new URL(resultadoQR); // Reemplaza con la URL real
    const params = new URLSearchParams(url.search);
    const mesaNumero = params.get("mesa"); // Esto da '14'
    console.log("Número de mesa:", mesaNumero);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <button
        className="cursor-pointer hover:text-[#eec802] transition-colors active:scale-95 duration-75 select-none"
        onClick={() => setModalAbierto(true)}
      >
        <LuQrCode className="w-6 h-6" />
      </button>

      {resultadoQR && (
        <div
          className="fixed inset-0 z-50 bg-black/50 bg-opacity-60 flex justify-center items-center"
          onClick={() => {
            setModalAbierto(false); // Cierra el modal
            setResultadoQR(null);
          }} // Cierra el modal al hacer clic fuera
        >
          <div className="mt-4 p-3 px-6 bg-white text-black rounded gap-4 flex flex-col items-center">
            <div className="text-5xl m-4">
              <strong className="">Mesa:</strong>{" "}
              <span className="font-semibold">{14}</span>
            </div>
            <button
              className="font-semibold bg-blue-600 text-white h-16 px-7 flex items-center justify-center cursor-pointer active:scale-95 hover:bg-blue-700 transition-colors duration-200 m-4"
              onClick={() => {
                setModalAbierto(false); // Cierra el modal
                console.log("Agregar a la orden:", mesa);
                setResultadoQR(null); // Limpia el resultado después de agregar
              }}
            >
              Agregar a la orden
            </button>
          </div>
        </div>
      )}

      <QRScannerModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onResult={manejarResultadoQR}
      />
    </div>
  );
}
