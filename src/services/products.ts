import { api } from "./api";

interface ProductFilters {
  category?: string;
  onSale?: boolean;
  minPrice?: number;
  maxPrice?: number;
  take?: number;
  skip?: number;
}

export async function fetchProducts(filters: ProductFilters = {}) {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.onSale !== undefined) params.append("onSale", String(filters.onSale));
  if (filters.minPrice !== undefined) params.append("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.append("maxPrice", String(filters.maxPrice));
  if (filters.take !== undefined) params.append("take", String(filters.take));
  if (filters.skip !== undefined) params.append("skip", String(filters.skip));

  return api.get(`/products?${params.toString()}`).then(res => res.data);
}
