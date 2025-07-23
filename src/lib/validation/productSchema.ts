import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().int().min(0),
  stock: z.number().int().min(0),
  image: z.string().url(),
  description: z.string().min(1),
  category: z.string().min(1),
  onSale: z.boolean().optional(),
  saleText: z.string().optional(),
});