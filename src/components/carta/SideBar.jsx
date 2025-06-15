"use client";

import { DonaCeciContext } from "@/context/DonaCeciContext";
import { useContext } from "react";

const SideBar = ({}) => {
  const { carta, setItemSeleccionado } = useContext(DonaCeciContext);

  return (
    <div className="w-72 h-[93%] md:flex flex-col items-center py-4 absolute left-0 top-14 overflow-y-scroll gap-2 px-4 hidden">
      {carta.map((item, index) => (
        <span
          key={index}
          onClick={() => setItemSeleccionado(item)}
          className="w-full px-4 py-2 text-white transition-colors cursor-pointer hover:bg-black/50 bg-black rounded-md font-roboto active:scale-95 duration-75 select-none"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default SideBar;
