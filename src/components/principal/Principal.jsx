"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Header from "./header/Header";
import Navbar from "./navbar/Navbar";
import DescubreLaCarta from "./descubre-carta/DescubreLaCarta";

const Principal = () => {
  //   useEffect(() => {
  //     const tl = gsap.timeline();
  //     tl.from(".empanada", {
  //       x: -200,
  //       rotate: -270,
  //       scale: 2,
  //       duration: 2,
  //       //   delay: 2,
  //       ease: "back.out(1.7)",
  //     });
  //   }, []);

  const handleEmpanada1Click = () => {
    const tl = gsap.timeline();
    tl.from(".empanada", {
      x: 0,
      y: 0,
    }).to(".empanada", {
      x: 400,
      y: -200,
      rotate: 0,
      scale: 1.5,
      duration: 1.5,
      ease: "back.out(1.7)",
    });
    //   .then(() => {
    //     window.location.href = "/productos/empanada";
    //   });
  };

  return (
    <div className="w-full relative h-screen">
      <div className="absolute inset-0 -z-10">
        <Image
          src={"/principal/fondo-i.png"}
          alt={"Fondo"}
          width={1920}
          height={1080}
          className="w-full h-screen object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/50 -z-10 w-full h-screen"></div>
      <Header />
      <div className="h-[1px] bg-zinc-300/50 my-5" />
      <Navbar />
      <DescubreLaCarta />
      <div className="absolute left-40 top-[600px] md:top-1/2 flex items-center justify-center w-40 md:w-80 h-40 md:h-80">
        <Image
          onClick={handleEmpanada1Click}
          src={"/productos/empanada.png"}
          alt={"Empanada"}
          width={1920}
          height={1080}
          className="w-full h-auto object-cover empanada"
        />
      </div>
      <div className="absolute bottom-0 flex items-center justify-center w-full">
        <Image
          src={"/divisor/divisor.png"}
          alt={"divisor"}
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Principal;
