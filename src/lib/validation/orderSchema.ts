import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1),
});

export const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  total: z.number().int().min(0),
});