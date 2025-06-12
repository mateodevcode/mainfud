"use client";

import { createContext, use, useEffect, useState } from "react";
import { carta, empanadas, bebidas, postres } from "@/data/carta";
import { useRouter } from "next/navigation";
import { getId } from "@qrvey/id-generator";

export const DonaCeciContext = createContext();

export const DonaCeciProvider = ({ children }) => {
  const router = useRouter();
  const customAlphabet = "0123456789ABCDEF";
  const customLength = 8;

  const [itemSeleccionado, setItemSeleccionado] = useState("Empanadas");
  const [pedido, setPedido] = useState([]);
  const [idioma, setIdioma] = useState("Español");
  const [modalOpenIdioma, setModalOpenIdioma] = useState(false);
  const [modalOpenListaArticulos, setModalOpenListaArticulos] = useState(false);
  const [modalOpenProductoSeleccionado, setModalOpenProductoSeleccionado] =
    useState(false);
  const [modalOpenIniciarSesion, setModalOpenIniciarSesion] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [orden, setOrden] = useState(null);
  const [idOrdenCreadaPendiente, setIdOrdenCreadaPendiente] = useState(null);

  const [ordenPendiente, setOrdenPendiente] = useState(null);
  const [IdOrdenesAlmacenadas, setIdOrdenesAlmacenadas] = useState([]);

  const [ordenActual, setOrdenActual] = useState(null); // Orden completa actual del pedido

  // Iniciar sesión y obtener usuarios
  const [usuarios, setUsuarios] = useState([]);

  // Modal de realizar pedido de inicio
  const [modalOpenRealizarPedido, setModalOpenRealizarPedido] = useState(false);

  // Modal menu hamburguesa
  const [isOpenMenuHamburguesa, setIsOpenMenuHamburguesa] = useState(false);

  useEffect(() => {
    const cargarOrdenPendiente = async () => {
      const response = await fetch(`/api/ordenes/${idOrdenCreadaPendiente}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrdenPendiente(data);
      }
    };
    if (idOrdenCreadaPendiente) {
      cargarOrdenPendiente();
    }
  }, [idOrdenCreadaPendiente]); // Dependencia para que se ejecute al cambiar el ID de la orden pendiente o al cargar el componente

  useEffect(() => {
    // Este código solo se ejecuta en el cliente
    const storedOrden = localStorage.getItem("orden");
    if (storedOrden) {
      setOrden(JSON.parse(storedOrden));
    }
  }, []);

  useEffect(() => {
    const storedIdOrden = localStorage.getItem("idOrdenCreadaPendiente");
    if (storedIdOrden) {
      setIdOrdenCreadaPendiente(storedIdOrden);
    }
  }, []);

  useEffect(() => {
    // Cargar IDs de órdenes almacenadas desde localStorage
    const storedIds = localStorage.getItem("idOrdenesAlmacenadas");
    if (storedIds) {
      setIdOrdenesAlmacenadas(JSON.parse(storedIds));
    }
  }, []);

  // Guardar orden en localStorage cada vez que cambie
  useEffect(() => {
    if (typeof window !== "undefined" && orden) {
      localStorage.setItem("orden", JSON.stringify(orden));
    }
  }, [orden]);

  useEffect(() => {
    if (typeof window !== "undefined" && idOrdenCreadaPendiente) {
      if (ordenPendiente?.estado !== "terminado") {
        localStorage.setItem("idOrdenCreadaPendiente", idOrdenCreadaPendiente);
      } else {
        localStorage.removeItem("idOrdenCreadaPendiente");
        localStorage.removeItem("orden");
      }
    }
  }, [idOrdenCreadaPendiente, ordenPendiente]);

  useEffect(() => {
    // Guardar IDs de órdenes almacenadas en localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "idOrdenesAlmacenadas",
        JSON.stringify(IdOrdenesAlmacenadas)
      );
    }
  }, [IdOrdenesAlmacenadas]);

  // Obtener lista de pedidos
  const listaPedidos = orden?.listaPedidos || [];

  // Calcular el total del carrito y el total de unidades
  const totalCarrito = pedido.reduce((total, pedido) => {
    return total + pedido.precio * pedido.cantidad;
  }, 0);
  // Calcular el total de unidades en el carrito
  const totalUnidades = pedido.reduce(
    (acc, pedido) => acc + pedido.cantidad,
    0
  );
  const precioTotal = Number(ordenPendiente?.total || 0); // Total de la orden pendiente
  const totalIVA = Number(ordenPendiente?.total * 0.19); // Calcular el subtotal (19% del total de la lista de pedidos)

  const agregarProducto = (producto) => {
    // Si no existe una orden activa, crearla
    if (!orden) {
      setOrden({
        pedido: getId(customAlphabet, customLength),
        nombre: "",
        direccion: "",
        mesa: "",
        total: 0,
        estado: "pendiente",
        listaPedidos: [],
        para_llevar: false,
      });
    }

    // Agregar al carrito (pedido temporal)
    setPedido((prev) => {
      const existente = prev.find((item) => item.id === producto.id);

      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const agregarPedido = () => {
    if (!pedido || pedido.length === 0) return;

    const idPedido = getId(customAlphabet, customLength);
    const totalPedido = pedido.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );

    const nuevoPedido = {
      id: idPedido,
      pedido: `Pedido N° ${listaPedidos.length + 1}`,
      items: [...pedido],
      total: totalPedido,
      estado: "pendiente",
    };

    // Calcular el total acumulado
    const totalOrden = [...listaPedidos, nuevoPedido].reduce(
      (acc, ped) => acc + ped.total,
      0
    );

    // Actualizar la orden completa
    setOrden((prevOrden) => ({
      ...prevOrden,
      total: totalOrden,
      listaPedidos: [...prevOrden.listaPedidos, nuevoPedido],
    }));

    // Limpiar carrito temporal
    setPedido([]);
  };

  // Crear orden en la base de datos
  const realizarPedidoEnServidor = async () => {
    const ordenLocal = JSON.parse(localStorage.getItem("orden"));

    if (!idOrdenCreadaPendiente) {
      try {
        const response = await fetch("/api/ordenes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ordenLocal), // Enviamos toda la orden
        });

        const data = await response.json();

        if (response.ok) {
          console.log("✅ Orden guardada en MongoDB:", data);
          setIdOrdenCreadaPendiente(data.orden._id); // Guardar ID de la orden creada
          setIdOrdenesAlmacenadas((prev) => [
            ...new Set([...prev, data.orden._id]),
          ]); // Actualizar lista de IDs de órdenes almacenadas
        }
      } catch (error) {
        console.error("🚨 Error al enviar la orden:", error);
      }
    } else {
      try {
        const response = await fetch(`/api/ordenes/${idOrdenCreadaPendiente}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listaPedidos: ordenLocal.listaPedidos,
            total: ordenLocal.total,
          }), // Enviamos toda la orden
        });

        const data = await response.json();

        if (response.ok) {
          setOrdenPendiente(data);
          console.log("✅ Orden actualizada en MongoDB:", data);
          // Opcional: limpiar carrito o mostrar notificación
        }
      } catch (error) {
        console.error("🚨 Error al actualizar la orden:", error);
      }
    }
  };

  return (
    <DonaCeciContext.Provider
      value={{
        router,
        carta,
        itemSeleccionado,
        setItemSeleccionado,
        listaPedidos,
        agregarProducto,
        idioma,
        setIdioma,
        modalOpenIdioma,
        setModalOpenIdioma,
        modalOpenListaArticulos,
        setModalOpenListaArticulos,
        totalCarrito,
        totalUnidades,
        empanadas,
        bebidas,
        postres,
        modalOpenProductoSeleccionado,
        setModalOpenProductoSeleccionado,
        productoSeleccionado,
        setProductoSeleccionado,
        pedido,
        setPedido,
        agregarPedido,
        modalOpenIniciarSesion,
        setModalOpenIniciarSesion,
        orden,
        realizarPedidoEnServidor,
        ordenPendiente,
        setOrdenPendiente,
        totalIVA,
        precioTotal,
        IdOrdenesAlmacenadas,
        ordenActual,
        setOrdenActual,
        usuarios,
        setUsuarios,
        modalOpenRealizarPedido,
        setModalOpenRealizarPedido,
        isOpenMenuHamburguesa,
        setIsOpenMenuHamburguesa,
      }}
    >
      {children}
    </DonaCeciContext.Provider>
  );
};
