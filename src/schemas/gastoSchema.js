import { z } from "zod";

export const gastoSchema = z.object({
    type: z.string("El nombre del articulo es requerido"),
    total: z.string("El articulo a sumar requiere un precio"),
    description: z.string("Agregue una descripcion para el gasto")
})
