import { z } from "zod";

export const itemSchema = z.object({
    name: z.string("El nombre del articulo es requerido"),
    serving: z.string("Indique el servicio del producto"),
    price: z.string("El articulo a sumar requiere un precio"),
    _id: z.string()
})

export const saleSchema = z.object({
  total: z.string().min(1, { message: "El monto es requerido" }),
  soldIn: z
    .string()
    .min(1, { message: "Por favor indique en que se abono la venta" }),
  items: z.array(itemSchema),
});
