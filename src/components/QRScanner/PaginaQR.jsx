"use client";

import { useContext, useEffect, useState } from "react";
import QRScannerModal from "./QRScannerModal";
import { LuQrCode } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { DonaCeciContext } from "@/context/DonaCeciContext";

export default function PaginaQR({ size = "w-6 h-6" }) {
  const router = useRouter();
  const { setModalOpenRealizarPedido, mesa, setMesa } =
    useContext(DonaCeciContext);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [resultadoQR, setResultadoQR] = useState(null);

  const manejarResultadoQR = (valor) => {
    setResultadoQR(valor);
    setModalAbierto(false);
  };

  useEffect(() => {
    if (!resultadoQR) return;

    try {
      const url = new URL(resultadoQR);
      const params = new URLSearchParams(url.search);
      const mesaNumero = params.get("mesa");

      if (mesaNumero) {
        setMesa(mesaNumero);
      } else {
        console.warn("El QR no contiene el parámetro 'mesa'");
        setMesa(null);
      }
    } catch (error) {
      console.error("URL inválida:", error);
      setMesa(null);
    }
  }, [resultadoQR]);

  console.log(mesa);

  return (
    <div className="flex items-center justify-center">
      <button
        className="cursor-pointer hover:text-[#eec802] transition-colors active:scale-95 duration-75 select-none"
        onClick={() => setModalAbierto(true)}
      >
        <LuQrCode className={size} />
      </button>

      {resultadoQR && (
        <div
          className="fixed inset-0 z-50 bg-black/50 bg-opacity-60 flex justify-center items-center"
          onClick={() => {
            setModalAbierto(false);
            setResultadoQR(null);
          }}
        >
          <div className="mt-4 p-3 px-6 bg-white text-black rounded gap-4 flex flex-col items-center">
            <div className="text-5xl m-4">
              <strong>Mesa:</strong>{" "}
              <span className="font-semibold">{mesa || "Cargando..."}</span>
            </div>
            <button
              className="font-semibold bg-blue-600 text-white h-16 px-7 flex items-center justify-center cursor-pointer active:scale-95 hover:bg-blue-700 transition-colors duration-200 m-4"
              onClick={() => {
                if (!mesa) return;
                setModalAbierto(false);
                router.push(`/carta?mesa=${mesa}`);
                setResultadoQR(null);
                setModalAbierto(false);
                setModalOpenRealizarPedido(false); // Abre el modal de realizar pedido
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
