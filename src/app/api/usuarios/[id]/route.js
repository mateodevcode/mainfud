import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/db";
import bcrypt from "bcrypt";

export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = await params;
    const UserEncontrado = await User.findOne(id);
    if (!UserEncontrado)
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(UserEncontrado);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 404,
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    await connectMongoDB();
    const data = await request.json();
    const UsuarioActualizado = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
    return new Response(
      JSON.stringify({
        message: "Usuario actualizado correctamente",
        user: UsuarioActualizado,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectMongoDB();
    const UsuarioEliminado = await User.findByIdAndDelete(id);
    if (!UsuarioEliminado) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "El Usuario se ha eliminado con éxito",
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Resetear contraseña
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    await connectMongoDB();
    const { password } = await request.json();
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword; // Actualizar la contraseña
    user.codigoVerificacion = ""; // Limpiar el código de verificación
    user.intentosFallidos = 0; // Reiniciar intentos fallidos
    user.bloqueado = false; // Desbloquear al usuario
    await user.save();

    const usuarios = await User.find({});

    return new Response(
      JSON.stringify({
        title: "Contraseña restablecida con éxito",
        message: "Tu contraseña ha sido actualizada correctamente.",
        users: usuarios,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
