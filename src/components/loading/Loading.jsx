import React from "react";
import Logo from "../principal/logo/Logo";
import Link from "next/link";

const Loading = () => {
  return (
    <div className="bg-[#eec802] w-full h-screen flex items-center justify-center absolute inset-0 z-50">
      <div>
        <Logo />
      </div>

      <div className="flex items-center justify-center mt-4 font-semibold absolute text-sm bottom-2 left-0 right-0 text-center">
        <Link href="https://seventwo.tech" target="_blank">
          Desarrollado por
          <strong className="font-semibold"> Seventwo</strong>
        </Link>
      </div>
    </div>
  );
};

export default Loading;
