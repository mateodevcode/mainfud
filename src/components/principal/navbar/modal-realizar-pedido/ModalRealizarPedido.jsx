"use client";

import PaginaQR from "@/components/QRScanner/PaginaQR";
import { DonaCeciContext } from "@/context/DonaCeciContext";
import { formatoDinero } from "@/lib/formatoDinero";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { HiArrowSmRight } from "react-icons/hi";
import { gsap } from "gsap";
import ModalIniciarSesion from "@/components/carta/ModalIniciarSesion";

const ModalRealizarPedido = () => {
  const {
    modalOpenRealizarPedido,
    setModalOpenRealizarPedido,
    handleConfetti,
    setModalOpenIniciarSesion,
  } = useContext(DonaCeciContext);
  const eleccionRef = useRef(null);
  const [tipoPedido, setTipoPedido] = useState("");

  const [paso1, setPaso1] = useState(false);
  const [paso2, setPaso2] = useState(false);

  useEffect(() => {
    if (paso2 && tipoPedido === "para_comer_aqui" && eleccionRef.current) {
      gsap.fromTo(
        eleccionRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 2.5, ease: "bounce.out" }
      );
    }
  }, [paso2, tipoPedido]);

  return (
    <>
      <button
        className="bg-[#eec802] hover:bg-[#eec802]/50 text-amber-900 font-medium px-4 py-2 text-sm cursor-pointer select-none active:scale-95 transition-colors duration-300 animate-pulse"
        onClick={() => {
          setModalOpenRealizarPedido(true);
          setPaso1(true);
          setPaso2(false);
        }}
      >
        Realizar Pedido
      </button>

      <AnimatePresence>
        {modalOpenRealizarPedido && (
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20"
            onClick={() => setModalOpenRealizarPedido(false)}
          >
            <motion.div
              className="relative z-10 w-11/12 md:w-4/12 flex flex-col items-start bg-black/50 shadow-lg p-4 rounded-md"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {paso1 && (
                <>
                  <div className="flex items-center justify-center w-full md:h-96 mb-4 gap-4">
                    <div
                      className="w-1/2 md:h-96 p-4 flex flex-col items-center justify-center bg-[#eec802] rounded-md border-[1px] border-black text-amber-900 -rotate-12 hover:scale-105 transition-transform duration-300 cursor-pointer active:scale-95 select-none"
                      onClick={() => setTipoPedido("para_llevar")}
                    >
                      <Image
                        src="/realizar-pedido/para-llevar.png"
                        alt="Empanada"
                        width={600}
                        height={600}
                        className="w-54 h-auto rounded-md"
                      />
                      <span className="font-extrabold text-3xl md:text-5xl text-center">
                        !Para llevar¡
                      </span>
                      <div
                        className={`w-4 h-4 border-[1px] rounded-full mt-5 ${
                          tipoPedido === "para_llevar"
                            ? "bg-amber-900 border-amber-600"
                            : "bg-white border-white"
                        }`}
                      ></div>
                    </div>
                    <div
                      className="w-1/2 md:h-96 p-4 flex flex-col items-center justify-center bg-amber-900 rounded-md border-[1px] border-black rotate-12 hover:scale-105 transition-transform duration-300 cursor-pointer active:scale-95 text-[#eec802] select-none"
                      onClick={() => setTipoPedido("para_comer_aqui")}
                    >
                      <span className="font-extrabold text-2xl md:text-4xl text-center">
                        !Para comer aquí¡
                      </span>
                      <Image
                        src="/realizar-pedido/para-comer-aqui.png"
                        alt="Empanada"
                        width={600}
                        height={600}
                        className="w-52 h-auto rounded-md"
                      />
                      <div
                        className={`w-4 h-4 border-[1px] rounded-full mt-5 ${
                          tipoPedido === "para_comer_aqui"
                            ? "bg-[#eec802] border-[#eec802]/50"
                            : "bg-white border-white"
                        }`}
                      ></div>
                    </div>
                  </div>
                  {tipoPedido === "" && (
                    <p className="my-10 text-center font-semibold text-2xl md:text-4xl text-white">
                      Selecciona una opción
                    </p>
                  )}
                  {tipoPedido === "para_llevar" && (
                    <span className="my-10 text-center font-semibold text-3xl md:text-4xl text-white">
                      Para llevar
                    </span>
                  )}
                  {tipoPedido === "para_comer_aqui" && (
                    <span className="my-10 text-center font-semibold text-3xl md:text-4xl text-white">
                      {" "}
                      Para comer aquí
                    </span>
                  )}
                  <button
                    className={`w-full bg-[#eec802] text-black px-4 py-2 rounded-md font-semibold select-none flex items-center justify-center gap-2 ${
                      tipoPedido === ""
                        ? "opacity-50 cursor-not-allowed"
                        : "opacity-100 cursor-pointer hover:bg-[#eec802]/50 transition-colors duration-200  active:scale-95"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPaso1(false);
                      setPaso2(true);
                      if (tipoPedido === "para_comer_aqui") {
                        handleConfetti();
                        setTimeout(() => {
                          handleConfetti();
                        }, 1000);
                      }

                      if (tipoPedido === "para_llevar") {
                        setModalOpenIniciarSesion(true);
                        setModalOpenRealizarPedido(false);
                      }
                    }}
                  >
                    Siguiente <HiArrowSmRight className="text-2xl" />
                  </button>
                </>
              )}

              {paso2 && (
                <>
                  {/* {tipoPedido === "para_llevar" && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                      <ModalIniciarSesion />
                    </div>
                  )} */}
                  {tipoPedido === "para_comer_aqui" && (
                    <div className="text-white h-80 flex flex-col items-center justify-center gap-4 w-full my-10">
                      <span className="text-4xl" ref={eleccionRef}>
                        Excelente elección
                      </span>
                      <PaginaQR size={"w-32 h-32"} />
                      <span className="text-3xl font-semibold">
                        Haz click en el código QR
                      </span>
                      <span className="text-2xl">
                        Disfruta de nuestro menu.
                      </span>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalRealizarPedido;
