import { api } from "@/services/api";
import type { ProductWithRelations, ProductFilter } from "@/types/productTypes";

export async function fetchProductsClient(params: {
  skip?: number;
  take?: number;
  categorySlug?: string;
  subcategorySlug?: string;
  onSale?: boolean;
  minPrice?: number;
  maxPrice?: number;
}) {
  const res = await api.get("/products", { params });
  return res.data as ProductWithRelations[];
}
