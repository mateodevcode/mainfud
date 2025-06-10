import SideBar from "./SideBar";
import Header from "./Header";
import Menu from "./Menu";
import ModalIdioma from "./ModalIdioma";
import ModalListaArticulos from "./ModalListaArticulos";
import ModalProductoSeleccionado from "./ModalProductoSeleccionado";
import ModalIniciarSesion from "./ModalIniciarSesion";

const Carta = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center bg-[#eec802]">
        <Header />
        <div className="w-full flex flex-row items-start justify-between">
          <SideBar />
          <Menu />
        </div>
      </div>

      {/* Modal de idiomas */}
      <ModalIdioma />

      {/* Modal de Lista de productos */}
      <ModalListaArticulos />

      {/* Modal de producto seleccionado */}
      <ModalProductoSeleccionado />

      {/* Modal de iniciar sesión */}
      <ModalIniciarSesion />
    </>
  );
};

export default Carta;
