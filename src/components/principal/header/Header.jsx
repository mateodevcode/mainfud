"use client";
import React, { useContext } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { TbMailFilled } from "react-icons/tb";
import Logo from "../logo/Logo";
import { DonaCeciContext } from "@/context/DonaCeciContext";

const Header = () => {
  const { isOpenMenuHamburguesa, setIsOpenMenuHamburguesa } =
    useContext(DonaCeciContext);

  const email = "seventwotech@gmail.com";
  const subject = "Información sobre Dona Ceci";
  const body = "Hola, me gustaría obtener más información.";

  const handleEmail = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <div className="flex justify-between items-center pt-6 w-11/12 md:w-8/12 font-roboto">
        <div className="hidden md:flex items-center gap-2 text-white w-72 justify-start">
          <div className="w-8 h-8 bg-[#eec802] rounded-full flex items-center justify-center">
            <BiSolidPhoneCall className="w-4 h-4 text-amber-800" />
          </div>
          <div>
            <span className="text-sm">Teléfono:</span>
            <div className="font-medium">322 524 87 03</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-white justify-between md:justify-center md:w-60 w-full">
          {/* <MenuHamburguesa /> */}
          <button
            className="hamburger-button flex md:hidden"
            onClick={() => setIsOpenMenuHamburguesa(!isOpenMenuHamburguesa)}
            aria-label="Toggle menu"
          >
            <svg
              width="40"
              height="24"
              viewBox="0 0 40 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              {/* Línea superior */}
              <rect
                className={`line top ${isOpenMenuHamburguesa ? "active" : ""}`}
                x="4"
                y="6"
                width="30"
                height="2"
                rx="1"
              />

              {/* Línea inferior */}
              <rect
                className={`line bottom ${
                  isOpenMenuHamburguesa ? "active" : ""
                }`}
                x="4"
                y="16"
                width="30"
                height="2"
                rx="1"
              />
            </svg>
          </button>
          <Logo />
        </div>

        <div
          className="hidden md:flex items-center gap-2 text-white w-72 justify-end cursor-pointer hover:text-[#eec802] transition-colors active:scale-95 duration-75"
          onClick={handleEmail}
        >
          <div>
            <span className="text-sm">Email:</span>
            <div className="font-medium">info@donaceci.com</div>
          </div>
          <div className="w-8 h-8 bg-[#eec802] rounded-full flex items-center justify-center">
            <TbMailFilled className="w-4 h-4 text-amber-800" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
