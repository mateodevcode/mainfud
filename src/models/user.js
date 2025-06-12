import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    ubicacion: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
      default: "",
    },
    plan: {
      type: String,
      default: "gratis",
    },
    estado: {
      type: String,
      default: "activo",
    },
    intentosFallidos: {
      type: Number,
      default: 0,
    },
    bloqueado: {
      type: Boolean,
      default: false,
    },
    codigoVerificacion: {
      type: String,
      default: "",
    },
    dateCodigoVerificacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
