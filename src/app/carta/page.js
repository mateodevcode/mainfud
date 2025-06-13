import Carta from "@/components/carta/Carta";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <Carta />
    </Suspense>
  );
}
