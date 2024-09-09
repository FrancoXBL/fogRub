import { z } from "zod";

export const userSchema = z.object({
  nombreLocal: z.string().min(1, { message: "El nombre es requerido" }),
  type: z.string().min(1, { message: "El tipo de negocio" }),
  titular: z.string("El titular es requerido"),
  cel: z
    .string()
    .min(5, { message: "El número de celular debe tener al menos 5 dígitos" }),
  direccion: z.string().min(1, { message: "La dirección es requerida" }),
  _id: z.string()
});