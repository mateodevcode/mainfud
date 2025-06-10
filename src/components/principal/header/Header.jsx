import React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { TbMailFilled } from "react-icons/tb";
import Logo from "../logo/Logo";
import MenuHamburguesa from "./MenuHamburguesa";

const Header = () => {
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
          <MenuHamburguesa />
          <Logo />
        </div>

        <div className="hidden md:flex items-center gap-2 text-white w-72 justify-end">
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
