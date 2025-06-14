"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const containerVariants = [
  {
    image: "/redes/red-1.png",
    link: "https://wa.me/573002888529?text=Hola%20Doña%20Ceci,%20me%20gustaría%20hacer%20un%20pedido.",
  },
  {
    image: "/redes/red-2.png",
    link: "https://www.facebook.com/donaceciempanadasartesanales/",
  },
  {
    image: "/redes/red-3.png",
    link: "https://www.instagram.com/donacecie/",
  },
  {
    image: "/redes/red-4.png",
    link: "https://www.tiktok.com/@dona.cecicongelados",
  },
];

export default function Contacto() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const [openModalContacto, setOpenModalContacto] = useState(false);

  // Animación solo cuando el modal se abre y los elementos están en el DOM
  useEffect(() => {
    if (openModalContacto) {
      setTimeout(() => {
        itemsRef.current.forEach((item, i) => {
          if (!item) return;

          const x = (Math.random() - 0.5) * window.innerWidth * 2;
          const y = (Math.random() - 0.5) * window.innerHeight * 2;

          gsap.set(item, {
            x,
            y,
            opacity: 0,
            scale: 0.5,
          });

          gsap.to(item, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 2,
            delay: Math.random() * 0.1,
            ease: "power3.out",
            stagger: 0.2,
          });
        });
      }, 50); // pequeño delay para asegurar que los refs existan
    }
  }, [openModalContacto]);

  return (
    <>
      <button
        onClick={() => setOpenModalContacto(true)}
        className="hover:text-[#eec802] transition-colors active:scale-95 duration-75 select-none cursor-pointer"
      >
        Contacto
      </button>

      <AnimatePresence>
        {openModalContacto && (
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20"
            onClick={() => setOpenModalContacto(false)}
          >
            <motion.div
              className="relative z-10 w-4/12 flex flex-col items-start bg-black/50 shadow-lg p-4 rounded-md"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                ref={containerRef}
                className="relative w-full max-w-4xl h-[400px] border-4 border-dashed border-[#eec802] flex flex-wrap items-center justify-center gap-4 overflow-hidden font-sans"
              >
                <h2 className="text-center text-3xl w-full my-2 text-white font-semibold">
                  Estamos aquí para ayudarte.
                </h2>
                {containerVariants.map((item, i) => (
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i}
                    ref={(el) => {
                      if (el) itemsRef.current[i] = el;
                    }}
                    className="w-24 h-24 opacity-0"
                  >
                    <Image
                      src={item.image}
                      alt={`img-${i}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                ))}
                <p className="text-center text-xl">
                  Puedes contactarnos a través de nuestras redes sociales o
                  visitarnos en el restaurante.
                </p>
                <p className="text-center text-2xl text-amber-300">
                  ¡Esperamos verte pronto!
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
