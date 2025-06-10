"use client";

import Header from "../carta/Header";
import { TbBorderCornerSquare } from "react-icons/tb";
import Logo from "../principal/logo/Logo";
import { formatoDinero } from "@/lib/formatoDinero";
import Pedidos from "./Pedidos";
import { DonaCeciContext } from "@/context/DonaCeciContext";
import { use, useContext, useEffect, useState } from "react";
import BadgeEstado from "../badges/BadgeEstado";
import { formatoFecha } from "@/lib/formatoFecha";

const Orden = () => {
  const { ordenPendiente, setOrdenPendiente, ordenActual, setOrdenActual } =
    useContext(DonaCeciContext);
  const [listaTodasLasOrdenes, setListaTodasLasOrdenes] = useState([]);
  const [IVA, setIVA] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [IDactual, setIDActual] = useState(null);

  // Actualizar datos del cliente
  const [formData, setFormData] = useState({
    nombre: ordenPendiente?.nombre || "",
    direccion: ordenPendiente?.direccion || "",
    mesa: ordenPendiente?.mesa || "",
    estado: ordenPendiente?.estado || "pendiente",
  });
  useEffect(() => {
    if (ordenPendiente) {
      setFormData({
        nombre: ordenPendiente.nombre || "",
        direccion: ordenPendiente.direccion || "",
        mesa: ordenPendiente.mesa || "",
        estado: ordenPendiente.estado || "pendiente",
      });
    }
  }, [ordenPendiente]);
  const actualizarDatosCliente = async () => {
    const payload = {
      ...ordenPendiente,
      ...formData,
    };
    const response = await fetch(`/api/ordenes/${ordenPendiente._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (response.ok) {
      setOrdenPendiente(data);
      console.log("Datos actualizados correctamente:", data);
    } else {
      console.error("Error al actualizar los datos:", data);
    }
  };
  // final actualizar datos del cliente

  useEffect(() => {
    const listaIds =
      JSON.parse(localStorage.getItem("idOrdenesAlmacenadas")) || [];

    const cargarTodasLasOrdenes = async () => {
      try {
        const response = await fetch("/api/ordenes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          const ordenesFiltradas = data.filter((orden) =>
            listaIds.includes(orden._id.toString())
          );
          setListaTodasLasOrdenes(ordenesFiltradas.reverse());
        }
      } catch (error) {
        console.error("Error de red al cargar las órdenes:", error);
      }
    };
    cargarTodasLasOrdenes();
  }, [ordenPendiente]);

  useEffect(() => {
    if (ordenActual) {
      const totaliva = ordenActual?.total * 0.19;
      const total = Number(ordenActual?.total) + totaliva;
      setIVA(totaliva);
      setPrecioTotal(total);
      setIDActual(ordenActual?._id);
    } else {
      const totaliva = ordenPendiente?.total * 0.19 || 0;
      const total = Number(ordenPendiente?.total) + totaliva || 0;
      setIVA(totaliva);
      setPrecioTotal(total);
      setIDActual(ordenPendiente?._id);
    }
  }, [ordenPendiente, IDactual, ordenActual]);

  return (
    <div className="w-full h-screen flex flex-col items-center bg-[#eec802] relative">
      <Header />

      {listaTodasLasOrdenes.length > 0 && (
        <div className="absolute top-14 h-6 w-7/12">
          <div className="flex items-center gap-2 overflow-x-scroll pb-1">
            {listaTodasLasOrdenes.map((orden) => (
              <span
                key={orden._id}
                className={`text-xs font-semibold px-4 py-1 rounded-md border-[1px] select-none cursor-pointer active:scale-95 transition-colors duration-200 
                  ${
                    orden._id === IDactual
                      ? "bg-black text-[#eec802] border-black"
                      : orden.estado === "terminado"
                      ? "bg-green-200 text-green-600 border-green-600"
                      : orden.estado === "pendiente"
                      ? "bg-amber-200 text-amber-600 border-amber-600"
                      : orden.estado === "cancelado"
                      ? "bg-red-200 text-red-600 border-red-600"
                      : ""
                  }
                  
                  `}
                onClick={() => {
                  setOrdenActual(orden);
                }}
              >
                {orden.pedido}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="w-[60%] flex flex-col items-center bg-zinc-100 mt-14 shadow-2xl relative p-20 h-[85%]">
        {/* Borde derecha arriba */}
        <div className="absolute top-0 right-0 p-10">
          <TbBorderCornerSquare className="text-5xl rotate-90" />
        </div>
        {/* Borde izquiera abajo */}
        <div className="absolute left-0 bottom-0 p-10">
          <TbBorderCornerSquare className="text-5xl -rotate-90" />
        </div>

        <div className="absolute overflow-y-auto w-full px-12 h-[77%]">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex items-center gap-8">
              <p className="font-extrabold text-6xl">Pedido</p>
              {/* <span className="text-xs text-red-500 font-semibold bg-red-200 px-4 py-1 rounded-full border-[1px] border-red-500">
                pendiente
              </span> */}
              <BadgeEstado
                estado={ordenActual?.estado || ordenPendiente?.estado}
              />
            </div>
            {/* Logo */}
            <div className="mx-10">
              <Logo />
            </div>
          </div>
          {/* Nombre y pedido */}
          <div className="flex flex-row w-full justify-between items-start mt-5 mb-5 gap-4">
            <div className="w-1/2">
              <p className="text-lg font-semibold">Nombre del cliente:</p>
              {ordenActual?.nombre || ordenPendiente?.nombre ? (
                <span>{ordenActual?.nombre || ordenPendiente?.nombre}</span>
              ) : (
                <input
                  type="text"
                  placeholder="Ingrese tu nombre"
                  className="p-2 border-none border-b-2 border-gray-300 focus:outline-none focus:border-black w-full"
                  value={formData.nombre}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      nombre: e.target.value,
                    });
                  }}
                />
              )}
            </div>
            <div className="w-1/2">
              <p className="text-lg font-semibold">Pedido N°</p>
              <span>{ordenActual?.pedido || ordenPendiente?.pedido}</span>
            </div>
          </div>

          {/* Direccion y fecha */}
          <div className="flex flex-row w-full justify-between items-start gap-4">
            {ordenActual?.para_llevar || ordenPendiente?.para_llevar ? (
              <div className="w-1/2">
                <p className="text-lg font-semibold">Dirección:</p>
                {ordenActual?.direccion || ordenPendiente?.direccion ? (
                  <span>
                    {ordenActual?.direccion || ordenPendiente?.direccion}
                  </span>
                ) : (
                  <input
                    type="text"
                    placeholder="Ingrese tu dirección"
                    className="p-2 border-none border-b-2 border-gray-300 focus:outline-none focus:border-black w-full"
                    value={formData.direccion}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        direccion: e.target.value,
                      });
                    }}
                  />
                )}
              </div>
            ) : (
              <div className="w-1/2">
                <p className="text-lg font-semibold">Mesa:</p>
                {ordenActual?.mesa || ordenPendiente?.mesa ? (
                  <span>{ordenActual?.mesa || ordenPendiente?.mesa}</span>
                ) : (
                  <input
                    type="text"
                    placeholder="Escanea el código QR de tu mesa"
                    className="p-2 border-none border-b-2 border-gray-300 focus:outline-none focus:border-black w-full"
                    value={formData.mesa}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        mesa: e.target.value,
                      });
                    }}
                  />
                )}
              </div>
            )}
            <div className="w-1/2">
              <p className="text-lg font-semibold">Fecha:</p>
              <span>
                {formatoFecha(ordenActual?.createdAt) ||
                  formatoFecha(ordenPendiente?.createdAt)}
              </span>
            </div>
          </div>
          {ordenActual?.estado !== "terminado" && (
            <div>
              {(ordenPendiente?.nombre === "" ||
                ordenPendiente?.mesa === "") && (
                <button
                  className="text-sm px-4 py-1 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 transition-colors duration-200 cursor-pointer active:scale-95"
                  onClick={async () => await actualizarDatosCliente()}
                >
                  Agregar datos
                </button>
              )}
            </div>
          )}

          {/* resumen */}
          <div className="w-full">
            <div className="w-full bg-black text-white p-4 mt-10 flex flex-row justify-between items-center h-16">
              <span className="font-semibold">Descripción</span>
              <span className="font-semibold">Precio</span>
            </div>
            <Pedidos ordenCompleta={ordenActual || ordenPendiente} />
          </div>

          {/* Total */}
          <>
            <div className="w-full">
              <div className="w-full p-4 flex flex-row justify-end items-center h-16 gap-2">
                <span className="font-semibold text-black h-16 px-5 flex items-center justify-center">
                  IVA (19%)
                </span>
                <span className="font-semibold">{formatoDinero(IVA)}</span>
              </div>
            </div>

            <div className="w-full">
              <div className="w-full p-4 flex flex-row justify-end items-center h-16 gap-2">
                <span className="font-semibold bg-black text-white h-16 px-5 flex items-center justify-center">
                  Total
                </span>
                <span className="font-semibold">
                  {formatoDinero(precioTotal)}
                </span>
              </div>
            </div>

            {ordenActual?.estado !== "terminado" && ordenPendiente && (
              <div className="w-full flex justify-end items-center mt-4">
                <button
                  className="font-semibold bg-blue-600 text-white h-16 px-7 flex items-center justify-center cursor-pointer active:scale-95 hover:bg-blue-700 transition-colors duration-200"
                  onClick={async () => {
                    const payload = {
                      ...ordenPendiente,
                      estado: "terminado",
                    };
                    const response = await fetch(
                      `/api/ordenes/${ordenPendiente._id}`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                      }
                    );
                    const data = await response.json();
                    if (response.ok) {
                      setOrdenPendiente(data);
                      console.log("Orden terminada correctamente:", data);
                    } else {
                      console.error("Error al terminar la orden:", data);
                    }
                  }}
                >
                  Pagar
                </button>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Orden;
