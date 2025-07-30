import { Product } from "@/types/productTypes";
import { api } from "./api";

export interface ProductFilters {
  category?: string;
  onSale?: boolean;
  minPrice?: number;
  maxPrice?: number;
  skip?: number;
  take?: number;
}

export async function fetchProducts(filters: ProductFilters = {}) {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.onSale) params.append("onSale", "true");
  if (filters.minPrice !== undefined) params.append("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.append("maxPrice", String(filters.maxPrice));
  if (filters.skip !== undefined) params.append("skip", String(filters.skip));
  if (filters.take !== undefined) params.append("take", String(filters.take));

  const res = await api.get(`/products?${params.toString()}`);
  return res.data as Product[];
}
