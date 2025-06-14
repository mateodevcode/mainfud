import Carta from "@/components/carta/Carta";
import Loading from "@/components/loading/Loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Carta />
    </Suspense>
  );
}
