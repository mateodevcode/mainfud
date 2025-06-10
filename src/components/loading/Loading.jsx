import React from "react";
import Logo from "../principal/logo/Logo";

const Loading = () => {
  return (
    <div className="bg-[#eec802] w-full h-screen flex items-center justify-center absolute inset-0 z-50">
      <div>
        <Logo />
      </div>

      <div className="flex items-center justify-center mt-4 font-semibold absolute text-sm bottom-2 left-0 right-0 text-center">
        <span>Desarrollado por</span>{" "}
        <span className="font-semibold"> Seventwo</span>
      </div>
    </div>
  );
};

export default Loading;
