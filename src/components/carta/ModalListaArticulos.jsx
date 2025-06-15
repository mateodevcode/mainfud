"use client";

import { DonaCeciContext } from "@/context/DonaCeciContext";
import Image from "next/image";
import { useContext } from "react";
import { IoCart } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { formatoDinero } from "@/lib/formatoDinero";

const ModalListaArticulos = () => {
  const {
    setModalOpenListaArticulos,
    modalOpenListaArticulos,
    pedido,
    totalUnidades,
    totalCarrito,
    setProductoSeleccionado,
    setModalOpenProductoSeleccionado,
    agregarPedido,
    setPedido,
    realizarPedidoEnServidor,
  } = useContext(DonaCeciContext);

  const handleClick = () => {
    // 1. Agrega el pedido
    agregarPedido(pedido);
    setPedido([]);
    setModalOpenListaArticulos(false);

    Promise.resolve().then(() => {
      // Verifica que sea array y tenga contenido
      // console.log("orden:", JSON.stringify(orden, null, 2));
      // console.log(
      //   "¿Es array listaPedidos?",
      //   Array.isArray(orden?.listaPedidos)
      // );
      // console.log("Contenido listaPedidos:", orden?.listaPedidos);

      // Enviar petición
      realizarPedidoEnServidor();
    });
  };

  return (
    <AnimatePresence>
      {modalOpenListaArticulos && (
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
          onClick={() => setModalOpenListaArticulos(false)}
        >
          <motion.div
            className="absolute top-14 md:right-28 gap-1 z-10 w-96 flex flex-col items-center bg-black shadow-lg rounded-md overflow-y-auto max-h-[70vh]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {pedido.length > 0 ? (
              <>
                {pedido.map((pedido, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setProductoSeleccionado(pedido);
                      setModalOpenProductoSeleccionado(true);
                    }}
                    className="flex items-center justify-between gap-2 text-sm text-white w-full px-4 py-2 cursor-pointer select-none hover:bg-white/10 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={pedido.image}
                        alt={pedido.nombre}
                        width={50}
                        height={50}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="text-xs bg-[#eec802] text-black p-1 flex items-center gap-1 -ml-5 rounded-full">
                        <span>x</span>{" "}
                        <span className="font-semibold">{pedido.cantidad}</span>
                      </div>
                      <span className="text-sm font-roboto">
                        {pedido.nombre}
                      </span>
                    </div>
                    <span className="bg-[#eec802] text-black px-2 rounded-full font-semibold">
                      {formatoDinero(pedido.precio)}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-1 text-sm text-white w-full px-4 py-2 border-t-[1px] border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-roboto font-bold">
                      {totalUnidades}{" "}
                      {totalUnidades > 1
                        ? "Productos seleccionados"
                        : "Producto seleccionado"}
                    </span>
                  </div>
                </div>
                {/* Subtotal */}
                <div className="flex items-center justify-between gap-1 text-sm text-white w-full px-4 py-2 border-t-[1px] border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-roboto font-bold">
                      SubTotal:
                    </span>
                  </div>
                  <span className="text-[#eec802] px-2 rounded-full font-semibold">
                    {formatoDinero(totalCarrito)}
                  </span>
                </div>
                {/* Boton solicitar pedido */}
                <div className="flex items-center justify-between gap-1 w-full p-2">
                  <button
                    className="w-full bg-[#eec802] text-black px-4 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer active:scale-95 hover:bg-[#eec802]/50"
                    onClick={handleClick}
                  >
                    Pedir
                  </button>
                </div>
              </>
            ) : (
              <div
                className={`flex flex-col items-center gap-1 text-sm text-white w-full p-4 cursor-pointer select-none`}
                onClick={(e) => e.stopPropagation()}
              >
                <IoCart className="text-6xl" />
                <span className="text-xl font-semibold font-roboto">
                  Carrito vacio
                </span>
                <span className="text-center text-zinc-300 leading-5 mb-2 font-roboto">
                  Todavia no agregaste productos al carrito
                </span>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalListaArticulos;
