import BannerPublicitario from "@/components/banner/BannerPublicitario";
import Footer from "@/components/footer/Footer";
import Principal from "@/components/principal/Principal";
import Restaurante from "@/components/restaurante/Restaurante";
import TiposDeEmpanadas from "@/components/tipos-empanadas/TiposDeEmpanadas";

export default function Home() {
  return (
    <div className=" flex flex-col items-center justify-center w-full">
      <Principal />
      <Restaurante />
      <BannerPublicitario />
      <TiposDeEmpanadas />
      <Footer />
    </div>
  );
}
