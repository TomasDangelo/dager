import {  ProductFiltersType, CategoryWithSubcategories, ProductWithRelations } from "@/types/productTypes";
import { api } from "./api";

// Fetch productos
export async function fetchProducts(filters: ProductFiltersType & { skip?: number; take?: number; } = {}) {
  const params = new URLSearchParams();

  if (filters.categorySlug) params.append("categorySlug", filters.categorySlug);
  if (filters.subcategorySlug) params.append("subcategorySlug", filters.subcategorySlug);
  if (filters.onSale) params.append("onSale", "true");
  if (filters.minPrice !== undefined) params.append("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.append("maxPrice", String(filters.maxPrice));
  if (filters.skip !== undefined) params.append("skip", String(filters.skip));
  if (filters.take !== undefined) params.append("take", String(filters.take));

  const res = await api.get(`/products?${params.toString()}`);
  return res.data as ProductWithRelations[];
}

// Fetch de categorías y subcategorías para la navegación
export async function fetchCategoriesWithSubcategories() {
  const res = await api.get(`/categories`);
  return res.data as CategoryWithSubcategories[];
}