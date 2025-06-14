import BannerPublicitario from "@/components/banner/BannerPublicitario";
import BotonWhatsapp from "@/components/botonFlotante/BotonWhatsapp";
import FlayerPublicitario from "@/components/flayer-publicitario/FlayerPublicitario";
import Footer from "@/components/footer/Footer";
import Principal from "@/components/principal/Principal";
import Restaurante from "@/components/restaurante/Restaurante";
import TiposDeEmpanadas from "@/components/tipos-empanadas/TiposDeEmpanadas";

export default function Home() {
  return (
    <div className=" flex flex-col items-center justify-center w-full text-black">
      <Principal />
      <Restaurante />
      <BannerPublicitario />
      <TiposDeEmpanadas />
      <Footer />
      <BotonWhatsapp />
      <FlayerPublicitario />
    </div>
  );
}
