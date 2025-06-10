// components/GoogleMap.tsx
"use client";

import React from "react";

const Ubicacion = () => {
  const html = `
    <gmp-map 
      center="10.632166862487793,-74.92012023925781" 
      zoom="14" 
      map-id="DEMO_MAP_ID"
      style="width: 100%; height: 300px; border-radius: 10px; overflow: hidden;">
      <gmp-advanced-marker 
        position="10.632166862487793,-74.92012023925781" 
        title="Ubicación Doña Ceci">
      </gmp-advanced-marker>
    </gmp-map>
  `;

  return (
    <div
      className="w-full h-[300px]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Ubicacion;
