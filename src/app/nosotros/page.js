"use client";

import Footer from "@/components/footer/Footer";
import GaleriaImg from "@/components/galeria/GaleriaImg";
import Principal from "@/components/principal/Principal";
import React, { useState } from "react";

const page = () => {
  

  return (
    <div>
      <Principal />
      <GaleriaImg />
      <Footer />
    </div>
  );
};

export default page;
