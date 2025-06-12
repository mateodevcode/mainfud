import { connectMongoDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

// const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Debes definir esta variable en tu entorno (.env)

export async function GET(req) {
  await connectMongoDB();

  // // Validar API Key
  // const apiKey = req.headers.get("x-api-key"); // Corregido el acceso a los headers
  // if (!apiKey || apiKey !== API_KEY) {
  //   return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
  // }

  const usuarios = await User.find({});
  return NextResponse.json(usuarios);
}

// export async function POST(request) {
// await connectMongoDB();

// // Validar API Key
// const apiKey = request.headers.get("x-api-key");
// if (!apiKey || apiKey !== API_KEY) {
//   return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
// }

//   const { name, email, password, image, lista, historial, bloqueado } =
//     await request.json();
//   await User.create({
//     name,
//     email,
//     password,
//     image,
//     lista,
//     historial,
//     bloqueado,
//   });

//   return NextResponse.json({ message: "Usuario creado" }, { status: 201 });
// }
