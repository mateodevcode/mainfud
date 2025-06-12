"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Header from "./header/Header";
import Navbar from "./navbar/Navbar";
import DescubreLaCarta from "./descubre-carta/DescubreLaCarta";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import MenuHamburguesa from "./header/MenuHamburguesa";

gsap.registerPlugin(MotionPathPlugin);

const radius = 550;
const centerX = 600;
const centerY = 350;

const backgrounds = [
  "/principal/fondo-1.png",
  "/principal/fondo-1.png",
  "/principal/fondo-1.png",
];

const Principal = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const empanadas = useRef([]);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const currentIndexRef = useRef(0); // controla el índice actual para auto-rotación

  const empanadasList = [
    "/productos/empanada.png",
    "/productos/empanada-2.png",
    "/productos/empanada-3.png",
  ];

  const numItems = 3;
  const angleOffset = (2 * Math.PI) / numItems;

  const getPosition = (index) => {
    const angle = index * angleOffset - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const animateEmpanadas = (indexOffset = 1) => {
    const nextIndex =
      (currentIndexRef.current + indexOffset + numItems) % numItems;

    empanadas.current.forEach((emp, i) => {
      const targetIndex = (i + nextIndex) % numItems;
      const pos = getPosition(targetIndex);
      const scale = targetIndex === 0 ? 1.3 : targetIndex === 1 ? 1 : 0.7;
      const z = targetIndex === 0 ? 3 : targetIndex === 1 ? 2 : 1;
      gsap.to(emp, {
        duration: 3,
        x: pos.x,
        y: pos.y,
        scale: scale,
        zIndex: z,
        ease: "back.inOut(1.7)",
        rotation: "+=360",
      });
    });

    currentIndexRef.current = nextIndex;
    setBackgroundIndex(nextIndex);
  };

  const startAutoRotation = () => {
    intervalRef.current = setInterval(() => {
      animateEmpanadas(1);
    }, 6000);
  };

  const resetAutoRotation = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      startAutoRotation();
    }, 4000); // Reanuda auto-giro tras 4s de inactividad
  };

  useEffect(() => {
    empanadas.current.forEach((emp, i) => {
      const pos = getPosition(i);
      gsap.fromTo(
        emp,
        {
          x: pos.x - 300, // empieza desde más a la derecha
          y: pos.y,
          scale: i === 0 ? 1.3 : i === 1 ? 1 : 0.7,
          zIndex: i === 0 ? 3 : i === 1 ? 2 : 1,
        },
        {
          x: pos.x,
          y: pos.y,
          duration: 1.5,
          ease: "power3.out",
        }
      );
    });

    startAutoRotation();

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleManualNavigation = (direction) => {
    animateEmpanadas(direction);
    resetAutoRotation();
  };

  return (
    <div className="w-full relative h-screen">
      {/* Fondo dinámico */}
      {/* Transición de fondos con desvanecimiento */}
      <div className="absolute inset-0 -z-10 w-full h-screen">
        {/* {backgrounds.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Fondo ${i + 1}`}
            width={1920}
            height={1080}
            className={`w-full h-screen object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === backgroundIndex ? "opacity-100 z-0" : "opacity-0 z-[-1]"
            }`}
            priority={i === backgroundIndex}
          />
        ))} */}
        <Image
          src={"/principal/fondo-1.png"}
          alt={`Fondo`}
          width={1920}
          height={1080}
          className="w-full h-screen object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100 z-0"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/50 -z-10 w-full h-screen"></div>

      <Header />
      <div className="h-[1px] bg-zinc-300/50 my-5" />
      <Navbar />
      <DescubreLaCarta />

      {/* Empanadas */}
      <div className="hidden absolute left-0 transform -translate-x-1/2 -translate-y-250 pointer-events-none md:grid place-items-center">
        <div className="relative overflow-hidden w-400 h-svh">
          {empanadasList.map((cls, i) => (
            <img
              key={i}
              ref={(el) => (empanadas.current[i] = el)}
              src={cls}
              className={`absolute w-64  ${cls}`}
              style={{ top: 0, left: 0 }}
            />
          ))}
        </div>
      </div>

      {/* Botones */}
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 hidden md:flex gap-4 z-10 pointer-events-auto">
        <button
          onClick={() => handleManualNavigation(-1)}
          className="p-2 bg-[#eec802] text-amber-900 rounded-lg shadow transition cursor-pointer active:scale-95 opacity-30 hover:opacity-100"
        >
          <MdOutlineKeyboardArrowLeft className="text-2xl" />
        </button>
        <button
          onClick={() => handleManualNavigation(1)}
          className="p-2 bg-[#eec802] text-amber-900 rounded-lg shadow transition cursor-pointer active:scale-95 opacity-30 hover:opacity-100"
        >
          <MdOutlineKeyboardArrowRight className="text-2xl" />
        </button>
      </div>

      {/* Divisor inferior */}
      <div className="absolute bottom-0 flex items-center justify-center w-full">
        <Image
          src={"/divisor/divisor.png"}
          alt={"divisor"}
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
        />
      </div>
      <MenuHamburguesa />
    </div>
  );
};

export default Principal;
