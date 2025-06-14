import Footer from "@/components/footer/Footer";
import GaleriaImg from "@/components/galeria/GaleriaImg";
import Principal from "@/components/principal/Principal";

const page = () => {
  return (
    <div>
      <Principal fondo={"/principal/fondo-2.png"} />
      <GaleriaImg />
      <Footer />
    </div>
  );
};

export default page;
