import { fetchProducts } from "@/services/products";
import ProductosClient from "@/components/products/ProductosClient";
import type { Product } from "@/types/productTypes";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ProductosPage({ searchParams }: Props) {
  const initialProducts: Product[] = await fetchProducts({ take: 12, ...searchParams });

  const categories = Array.from(
    new Set(initialProducts.map(p => p.category).filter(Boolean))
  );

  const initialFilters = {
    category: typeof searchParams?.category === "string" ? searchParams.category : undefined,
    onSale: searchParams?.onSale === "true",
    minPrice: searchParams?.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams?.maxPrice ? Number(searchParams.maxPrice) : undefined,
  };

  return (
    <ProductosClient initialProducts={initialProducts} initialCategories={categories} initialFilters={initialFilters}/>
  );
}
