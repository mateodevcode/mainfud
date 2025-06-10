"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TbMailFilled } from "react-icons/tb";
import { FaLock } from "react-icons/fa";
import { DonaCeciContext } from "@/context/DonaCeciContext";

export function FormIniciarSesion({ className, ...props }) {
  const { router } = useContext(DonaCeciContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [verContraseña, setVerContraseña] = useState(false);
  const [, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/iniciar-sesion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const { error, user } = await res.json();
    setIdUser(user.id);
    if (!res.ok) {
      setError(error);
    } else {
      router.push("/");
      toast.success("Inicio de sesión exitoso.", {
        description: "Bienvenido de nuevo.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={"flex flex-col gap-6 py-10"}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Inicia sesión</h1>
        <p className="text-balance text-sm text-zinc-400">
          Ingresa tu email para acceder a tu cuenta
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <label htmlFor="email">Correo electrónico</label>
          <div className="relative flex items-center justify-start gap-4 w-full cursor-pointer select-none py-2 rounded-md bg-white text-black border border-zinc-300 hover:bg-zinc-100">
            <TbMailFilled className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-10 pr-10 text-sm border-none w-full focus:outline-none focus:ring-0"
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
          <div className="relative flex items-center gap-4 w-full cursor-pointer select-none py-2 rounded-md bg-white text-black border border-zinc-300 justify-center hover:bg-zinc-100">
            <FaLock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              id="password"
              type={verContraseña ? "text" : "password"}
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="pl-10 pr-10 text-sm border-none w-full focus:outline-none focus:ring-0"
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
          className="w-full bg-black text-white hover:bg-zinc-800 cursor-pointer select-none py-2 rounded-md"
        >
          Iniciar sesión
        </button>

        <div className="flex items-center justify-center gap-2">
          <span className="relative z-10 px-2 text-zinc-400 bg-white">
            o continúa con
          </span>
          <div className="absolute h-[1px] bg-zinc-200 w-8/12 mt-1" />
        </div>

        <button
          className="w-full cursor-pointer select-none py-2 rounded-md bg-white text-black border border-zinc-300 flex items-center justify-center gap-4 hover:bg-zinc-100"
          type="submit"
        >
          <FcGoogle />
          Iniciar sesión con Google
        </button>
      </div>

      <div className="text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/registrarse"
          className="font-semibold hover:text-zinc-700 hover:underline"
        >
          Regístrate
        </Link>
      </div>
    </form>
  );
}
