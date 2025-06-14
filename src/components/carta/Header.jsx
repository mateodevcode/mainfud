"use client";

import React, { useContext } from "react";
import { IoCart } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import Image from "next/image";
import { DonaCeciContext } from "@/context/DonaCeciContext";
import Link from "next/link";
import { AnimateNumber } from "./animateNumber/AnimateNumber";
import PaginaQR from "../QRScanner/PaginaQR";
import { signOut, useSession } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import MenuHamburguesaCarta from "./menuHamburguesaCarta/MenuHamburguesaCarta";
import { BsFillPersonFill } from "react-icons/bs";

const Header = () => {
  const {
    idioma,
    modalOpenIdioma,
    setModalOpenIdioma,
    modalOpenListaArticulos,
    setModalOpenListaArticulos,
    totalUnidades,
    setModalOpenIniciarSesion,
    modalOpenIniciarSesion,
  } = useContext(DonaCeciContext);
  const { data: session, status } = useSession();

  return (
    <div className="w-full h-12 bg-black flex items-center justify-between relative z-10">
      <div className="flex flex-row items-center justify-center gap-4 mx-5 md:mx-10">
        <h1 className="text-2xl text-[#eec802] font-divertida">
          <Link href="/">Doña Ceci</Link>
        </h1>
        <span className="text-white text-sm hidden md:flex">
          Empanadas Artesanales
        </span>
      </div>
      <div className="flex items-center justify-between">
        <PaginaQR size={"w-6 h-6 text-white mr-4 md:hidden flex"} />
        <div
          className="relative cursor-pointer hover:text-[#eec802] transition-colors active:scale-95 duration-75 flex md:hidden items-center gap-1 select-none mr-4"
          onClick={() => {
            setModalOpenListaArticulos(!modalOpenListaArticulos);
            setModalOpenIdioma(false);
          }}
        >
          <IoCart className="text-xl text-white" />
          <AnimateNumber value={totalUnidades} />
        </div>
        {status === "authenticated" ? (
          <div className="flex items-center gap-2 active:scale-95 duration-75 cursor-pointer hover:text-[#eec802] transition-colors select-none mr-4">
            <Image
              src={session?.user?.image || "/logo/logo.png"}
              alt={"Usuario"}
              width={40}
              height={40}
              className="rounded-full w-6 h-6"
            />
          </div>
        ) : (
          <div
            className="flex items-center active:scale-95 duration-75 cursor-pointer hover:text-[#eec802] transition-colors select-none mr-4 text-white md:hidden"
            onClick={() => {
              setModalOpenIniciarSesion(!modalOpenIniciarSesion);
              setModalOpenListaArticulos(false);
              setModalOpenIdioma(false);
            }}
          >
            <BsFillPersonFill className="text-xl" />
          </div>
        )}
        <MenuHamburguesaCarta />
      </div>
      <div className="fixed right-10">
        <ul className="hidden md:flex items-center gap-8 text-white font-roboto">
          <li className="flex items-center active:scale-95 duration-75 cursor-pointer hover:text-[#eec802] transition-colors select-none">
            <PaginaQR />
          </li>
          <li
            className={`cursor-pointer hover:text-[#eec802] transition-colors active:scale-95 duration-75 select-none`}
          >
            <Link href="/carta">
              <span>Carta</span>
            </Link>
          </li>
          <li className="cursor-pointer hover:text-[#eec802] transition-colors active:scale-95 duration-75 select-none">
            <Link href="/ordenes">
              <span>Ordenes</span>
            </Link>
          </li>
          {status === "unauthenticated" && (
            <li
              className="cursor-pointer hover:text-[#eec802] transition-colors active:scale-95 duration-75 select-none"
              onClick={() => {
                setModalOpenIniciarSesion(!modalOpenIniciarSesion);
                setModalOpenListaArticulos(false);
                setModalOpenIdioma(false);
              }}
            >
              <span>Iniciar sesion</span>
            </li>
          )}
          {status === "authenticated" && (
            <li className="flex items-center gap-2 active:scale-95 duration-75 cursor-pointer hover:text-[#eec802] transition-colors select-none">
              <Image
                src={session?.user?.image || "/logo/logo.png"}
                alt={"Usuario"}
                width={40}
                height={40}
                className="rounded-full w-7 h-7"
              />
              <div
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                <MdLogout className="text-xl" />
              </div>
            </li>
          )}
          <li
            className="relative cursor-pointer hover:text-[#eec802] transition-colors active:scale-95 duration-75 flex items-center gap-1 select-none"
            onClick={() => {
              setModalOpenListaArticulos(!modalOpenListaArticulos);
              setModalOpenIdioma(false);
            }}
          >
            <IoCart className="text-xl" />
            <AnimateNumber value={totalUnidades} />
          </li>
          <li
            className="cursor-pointer hover:text-[#eec802] transition-colors active:scale-95 duration-75 relative flex items-center gap-1 select-none"
            onClick={() => {
              setModalOpenIdioma(!modalOpenIdioma);
              setModalOpenListaArticulos(false);
            }}
          >
            {idioma === "Español" && (
              <div>
                <Image
                  src="/idioma/colombia.png"
                  alt="Español"
                  width={20}
                  height={20}
                  className="inline-block mr-1"
                />
              </div>
            )}
            {idioma === "ingles" && (
              <div>
                <Image
                  src="/idioma/usa.png"
                  alt="Ingles"
                  width={20}
                  height={20}
                  className="inline-block mr-1"
                />
              </div>
            )}

            <TiArrowSortedDown />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
