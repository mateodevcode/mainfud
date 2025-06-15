"use client";

import Image from "next/image";
import Link from "next/link";

const Loading = () => {
  return (
    <div className="bg-[#eec802] max-w-screen max-h-screen flex items-center justify-center fixed inset-0 z-20 h-screen w-screen">
      <div className="">
        <Image
          src={"/logo/logo.png"}
          alt="Logo"
          width={400}
          height={400}
          className="h-32 md:h-40 w-auto border-4 border-white rounded-full bg-white"
        />
      </div>

      <div className="flex items-center justify-center mt-4 font-semibold absolute text-sm bottom-16 md:bottom-4 left-0 right-0 text-center">
        <Link href="https://seventwo.tech" target="_blank">
          Desarrollado por <strong className="font-bold">Seventwo</strong>
        </Link>
      </div>
    </div>
  );
};

export default Loading;
