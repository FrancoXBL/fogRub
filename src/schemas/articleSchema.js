import { z } from "zod";
export const articleSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  serving: z.string("El serving debe ser un número positivo"),
  price: z.string("El precio es requerido"),
  stock: z.string("El stock es requerido"),
  code: z.string("El código es requerido"),
  fechaActualizacion: z.string(),
});
