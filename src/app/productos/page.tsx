import { fetchProducts } from "@/services/products";
import ProductosClient from "@/components/products/ProductosClient";
import type { Product } from "@/types/productTypes";

export default async function ProductosPage() {
  const initialProducts: Product[] = await fetchProducts({take: 12});
  const categories = Array.from(new Set(initialProducts.map(p => p.category).filter(Boolean)));
  return (
    <ProductosClient initialProducts={initialProducts} initialCategories={categories} />
  );
}