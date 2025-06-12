import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "@/lib/db";
import bcrypt from "bcrypt";
import User from "@/models/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        await connectMongoDB();
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Correo no registrado");
        }

        if (user.bloqueado) {
          throw new Error("Cuenta bloqueada");
        }

        const verificarPassword = await bcrypt.compare(password, user.password);
        if (!verificarPassword) {
          user.intentosFallidos += 1;

          if (user.intentosFallidos >= 3) {
            user.bloqueado = true;
            await user.save();
            throw new Error("Usuario bloqueado");
          }

          await user.save();

          throw new Error("Contraseña incorrecta");
        }

        // Reiniciar intentos fallidos
        user.intentosFallidos = 0;
        await user.save();

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectMongoDB();

      // Verifica si el usuario ya existe
      const existingUser = await User.findOne({ email: user.email });

      // Si no existe, crea el usuario
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          imageUrl: user.image,
          provider: account.provider,
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
