"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useContext, useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { DonaCeciContext } from "@/context/DonaCeciContext";
import { Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";

export function FormIniciarSesion({ className, ...props }) {
  const { router, usuarios, setUsuarios } = useContext(DonaCeciContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [verContraseña, setVerContraseña] = useState(false);
  const [contadorClick, setContadorClick] = useState(0);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const verificarBloqueos = usuarios.find(
    (usuario) =>
      usuario.email.toLowerCase() === formData.email.toLowerCase() &&
      usuario.bloqueado === true
  );

  useEffect(() => {
    if (contadorClick > 3) {
      const cargarUsuarios = async () => {
        const response = await fetch("/api/usuarios", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUsuarios(data);
      };
      cargarUsuarios();
    }
  }, [contadorClick]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setContadorClick(contadorClick + 1);

    if (verificarBloqueos) {
      toast.error("Usuario bloqueado", {
        description:
          `Tu cuenta ${verificarBloqueos.email} está bloqueada. ` +
          "Por favor, contacta al administrador.",
      });
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
      callbackUrl: "/", // o a donde quieras redirigir
    });

    if (res?.ok) {
      router.push("/");
    } else {
      toast.error(res?.error, {
        description: Errores(res?.error),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={("flex flex-col gap-6 text-white", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold my-5">Inicia sesión</h1>
        <p className="text-balance text-sm text-zinc-400">
          Ingresa tu email para acceder a tu cuenta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2 mt-2">
          <label htmlFor="email">Correo electrónico</label>
          <div className="relative flex items-center justify-start gap-4 border-[1px] border-zinc-300 p-2">
            <Mail className="h-4 w-4 ml-2 text-muted-foreground" />
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent focus text-sm focus:outline-none focus:ring-0 focus:border-zinc-300"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <label htmlFor="password">Contraseña</label>
            <a
              href="/olvidaste-tu-contrasena"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="relative flex items-center justify-start gap-4 border-[1px] border-zinc-300 p-2">
            <Lock className="h-4 w-4 ml-2 text-muted-foreground" />
            <input
              id="password"
              type={verContraseña ? "text" : "password"}
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="focus:outline-none focus:ring-0 focus:border-zinc-300"
            />
            <div className="absolute right-3 top-2.5 h-4 w-4">
              {verContraseña ? (
                <IoEyeOutline
                  className="cursor-pointer"
                  onClick={() => setVerContraseña(false)}
                />
              ) : (
                <IoEyeOffOutline
                  className="cursor-pointer"
                  onClick={() => setVerContraseña(true)}
                />
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer select-none flex items-center justify-center gap-2 bg-[#eec802] p-2 my-2 rounded-full text-black hover:bg-[#eec802]/50 transition-colors duration-200 active:scale-95 border-[1px]"
        >
          Iniciar sesión
        </button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-white px-2 text-zinc-400">
            O continúa con
          </span>
        </div>
        <button
          variant="outline"
          className="w-full cursor-pointer select-none flex items-center justify-center gap-2 bg-zinc-200 p-2 my-2 rounded-full text-black hover:bg-zinc-300 transition-colors duration-200 active:scale-95 border-[1px] border-zinc-300"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            signIn("google", {
              callbackUrl: "/",
            });
          }}
        >
          <FcGoogle />
          Iniciar sesión con Google
        </button>
      </div>
      <div className="text-center text-sm my-5">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/registrarse"
          className="font-semibold hover:text-[#eec802] hover:underline"
        >
          Regístrate
        </Link>
      </div>
    </form>
  );
}
