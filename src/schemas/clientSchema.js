import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  type: z.string().min(1, { message: "El tipo de cuenta es requerido" }),
  celNumber: z
    .string()
    .min(5, { message: "El número de celular debe tener al menos 5 dígitos" }),
  direccion: z.string().min(1, { message: "La dirección es requerida" }),
  description: z.string().optional(),
  notes: z.string().optional(),
  debt: z.string("Se necesita aclarar la deuda"),
  lastEdit: z.string()
});