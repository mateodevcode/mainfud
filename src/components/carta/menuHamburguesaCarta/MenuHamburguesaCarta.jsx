"use client";

import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BsList } from "react-icons/bs";
import { RiDrinks2Fill } from "react-icons/ri";
import { FaIceCream } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { RiFileList3Line } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { DonaCeciContext } from "@/context/DonaCeciContext";
import PaginaQR from "@/components/QRScanner/PaginaQR";
import { LuQrCode } from "react-icons/lu";
import { signOut, useSession } from "next-auth/react";

const MenuHamburguesaCarta = () => {
  const { setItemSeleccionado, setModalOpenIniciarSesion } =
    useContext(DonaCeciContext);
  const [abrirMenu, setAbrirMenu] = useState(false);
  const menuRef = useRef(null);
  const [abrirQr, setAbrirQr] = useState(false);
  const { status } = useSession();

  // Detectar clic fuera del menú
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setAbrirMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [abrirMenu]);

  useEffect(() => {
    if (abrirMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [abrirMenu]);

  const handleQrClick = () => {
    setAbrirMenu(false);
    setTimeout(() => {
      setAbrirQr(true);
    }, 1000);
    setTimeout(() => {
      setAbrirQr(false);
    }, 10000);
  };

  return (
    <>
      <div
        className="mr-5 flex md:hidden select-none cursor-pointer hover:text-[#eec802] transition-colors active:scale-95 duration-75 text-white"
        onClick={() => setAbrirMenu(!abrirMenu)}
      >
        <BsList className="text-2xl" />
      </div>
      <AnimatePresence>
        {abrirMenu && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-20 h-screen w-screen"
            onClick={() => {
              setAbrirMenu(false);
            }}
          >
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`absolute top-14 left-1 bg-[#FDF9E5] text-white shadow-lg rounded-md p-4 w-64 overflow-y-scroll h-[calc(100vh-10rem)]`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu */}
              <h2 className="text-2xl font-bold text-black">Menu</h2>
              <div>
                <h3 className="text-xs font-semibold text-zinc-600">
                  Productos
                </h3>
                <ul className={`space-y-2 mt-2`}>
                  <li
                    className="flex items-center gap-4 cursor-pointer hover:bg-[#eec802] hover:text-black transition-colors active:scale-95 duration-75 select-none bg-black py-0.5 text-[#FDF9E5] px-2 rounded-md"
                    onClick={() => {
                      setAbrirMenu(false);
                      setItemSeleccionado("Empanadas");
                    }}
                  >
                    <Image
                      src={"/icon/icon-empanada.png"}
                      alt="empanada"
                      width={50}
                      height={50}
                      className="w-8"
                    />
                    <span className="text-base font-semibold">Empanadas</span>
                  </li>
                  <li
                    className="flex items-center gap-4 cursor-pointer hover:bg-[#eec802] hover:text-black transition-colors active:scale-95 duration-75 select-none bg-black py-1.5 px-2 rounded-md text-[#FDF9E5]"
                    onClick={() => {
                      setAbrirMenu(false);
                      setItemSeleccionado("Bebidas");
                    }}
                  >
                    <RiDrinks2Fill className="text-xl mx-1.5" />{" "}
                    <span className="text-base font-semibold">Bebidas</span>
                  </li>
                  <li
                    className="flex items-center gap-4 cursor-pointer hover:bg-[#eec802] hover:text-black transition-colors active:scale-95 duration-75 select-none bg-black py-1.5 px-2 rounded-md text-[#FDF9E5]"
                    onClick={() => {
                      setAbrirMenu(false);
                      setItemSeleccionado("Postres");
                    }}
                  >
                    <FaIceCream className="text-xl mx-1.5" />{" "}
                    <span className="text-base font-semibold">Postres</span>
                  </li>
                </ul>
              </div>
              {/* divisor */}
              <div className="h-[2px] bg-black rounded-md mt-5 mb-3"></div>
              {/* Pedidos */}
              <div>
                <h3 className="text-xs font-semibold text-zinc-600">Pedidos</h3>
                <ul className={`space-y-2 ${abrirMenu ? "mt-2" : "mt-0"}`}>
                  <li className="flex items-center justify-between gap-4 cursor-pointer hover:bg-[#eec802] hover:text-black transition-colors active:scale-95 duration-75 select-none bg-black py-1.5 px-2 rounded-md text-[#FDF9E5] w-full">
                    <div className="flex items-center gap-4">
                      <RiFileList3Line className="text-xl mx-1.5" />
                      <span className="text-base font-semibold">DF451241</span>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-green-600 mx-2"></div>
                  </li>
                  <li className="flex items-center justify-between gap-4 cursor-pointer hover:bg-[#eec802] hover:text-black transition-colors active:scale-95 duration-75 select-none bg-black py-1.5 px-2 rounded-md text-[#FDF9E5] w-full">
                    <div className="flex items-center gap-4">
                      <RiFileList3Line className="text-xl mx-1.5" />
                      <span className="text-base font-semibold">DF451241</span>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-black mx-2"></div>
                  </li>
                  <li className="flex items-center justify-between gap-4 cursor-pointer hover:bg-[#eec802] hover:text-black transition-colors active:scale-95 duration-75 select-none bg-black py-1.5 px-2 rounded-md text-[#FDF9E5] w-full">
                    <div className="flex items-center gap-4">
                      <RiFileList3Line className="text-xl mx-1.5" />
                      <span className="text-base font-semibold">DF451241</span>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-red-600 mx-2"></div>
                  </li>
                </ul>
              </div>
              {/* divisor */}
              <div className="h-[2px] bg-black rounded-md mt-5 mb-3"></div>
              {/* Mesa */}
              <div>
                <h3 className="text-xs font-semibold text-zinc-600">Mesa</h3>
                <ul className={`space-y-2 ${abrirMenu ? "mt-2" : "mt-0"}`}>
                  <li
                    className="flex items-center gap-4 cursor-pointer hover:bg-[#eec802] hover:text-black transition-colors active:scale-95 duration-75 select-none bg-black py-1.5 px-2 rounded-md text-[#FDF9E5]"
                    onClick={handleQrClick}
                  >
                    <LuQrCode className="text-xl mx-1.5" />{" "}
                    <span className="text-base font-semibold">
                      Escanea tu mesa
                    </span>
                  </li>
                </ul>
              </div>
              {/* divisor */}
              <div className="h-[2px] bg-black rounded-md mt-5 mb-3"></div>
              {/* Información */}
              <div>
                <h3 className="text-xs font-semibold text-zinc-600">Cuenta</h3>
                <ul className={`space-y-2 ${abrirMenu ? "mt-2" : "mt-0"}`}>
                  {status === "unauthenticated" && (
                    <li
                      className="flex items-center gap-4 cursor-pointer hover:bg-[#eec802] hover:text-black transition-colors active:scale-95 duration-75 select-none bg-black py-1.5 px-2 rounded-md text-[#FDF9E5]"
                      onClick={() => {
                        setModalOpenIniciarSesion(true);
                        setAbrirMenu(false);
                      }}
                    >
                      <BsFillPersonFill className="text-xl mx-1.5" />{" "}
                      <span className="text-base font-semibold">
                        Iniciar sesión
                      </span>
                    </li>
                  )}
                  <li className="flex items-center gap-4 cursor-pointer hover:bg-[#eec802] hover:text-black transition-colors active:scale-95 duration-75 select-none bg-black py-1.5 px-2 rounded-md text-[#FDF9E5]">
                    <RiFileList3Line className="text-xl mx-1.5" />{" "}
                    <span className="text-base font-semibold">
                      Pagar la cuenta
                    </span>
                  </li>
                  {status === "authenticated" && (
                    <li
                      className="flex items-center gap-4 cursor-pointer hover:bg-[#eec802] hover:text-black transition-colors active:scale-95 duration-75 select-none bg-black py-1.5 px-2 rounded-md text-[#FDF9E5]"
                      onClick={() => {
                        // signOut({ callbackUrl: "/" });
                        signOut();
                      }}
                    >
                      <MdOutlineLogout className="text-xl mx-1.5 rotate-180" />{" "}
                      <span className="text-base font-semibold">
                        Cerrar sesión
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PaginaQR
        abrir={abrirQr}
        setAbrir={setAbrirQr}
        text={false}
        size={"hidden text-white mr-4"}
      />
    </>
  );
};

export default MenuHamburguesaCarta;
