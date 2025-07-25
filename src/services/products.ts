import { api } from "./api";

interface ProductFilters {
  category: string;
  onSale: boolean;
  minPrice: number;
  maxPrice: number;
}

export async function fetchProducts(filters: ProductFilters) {
    const params = new URLSearchParams({
    category: filters.category,
    onSale: filters.onSale.toString(),
    minPrice: filters.minPrice.toString(),
    maxPrice: filters.maxPrice.toString(),
  });
  return api.get(`/products?${params.toString()}`).then(res => res.data);
}