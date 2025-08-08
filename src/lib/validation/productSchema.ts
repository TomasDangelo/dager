import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido."),
  price: z.number().int().min(0, "El precio debe ser un número entero positivo."),
  stock: z.number().int().min(0, "El stock debe ser un número entero positivo."),
  image: z.string().url("La URL de la imagen no es válida."),
  description: z.string().min(1, "La descripción es requerida."),
  subcategoryId: z.string().min(1, "La subcategoría es requerida."),
  onSale: z.boolean().optional(),
  saleText: z.string().optional(),
});