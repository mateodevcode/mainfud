import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Puedes agregar lógica adicional aquí si lo necesitas
  },
  {
    pages: {
      signIn: "/", // Cambia esto a la ruta de tu página de inicio de sesión
    },
  }
);

export const config = {
  matcher: ["/carta/:path*"], // Rutas protegidas
};
