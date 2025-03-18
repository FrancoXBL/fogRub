import { z } from "zod";
export const articleSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  price: z.string("El precio es requerido"),
  stock: z.string("El stock es requerido"),
  code: z.optional(z.string()),
  fechaActualizacion: z.string(),
});
