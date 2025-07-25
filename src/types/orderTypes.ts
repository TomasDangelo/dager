import type { Product } from "./productTypes";

export type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
};

export type Order = {
  id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: Date;
  items: OrderItem[];
};