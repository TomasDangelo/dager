// src/app/productos/page.tsx
import ProductosClient from "@/components/products/ProductosClient";
import type { ProductWithRelations, CategoryWithSubcategories, ProductFilter } from "@/types/productTypes";
import { getProductsServer, fetchCategoriesWithSubcategoriesServer } from "@/services/products.server";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

function getFiltersFromSearchParams(searchParams?: { [k: string]: string | string[] | undefined }): ProductFilter {
  return {
    onSale: searchParams?.onSale === "true" ? true : undefined,
    minPrice: searchParams?.minPrice ? Number(searchParams.minPrice as string) : undefined,
    maxPrice: searchParams?.maxPrice ? Number(searchParams.maxPrice as string) : undefined,
    categorySlug: undefined,
    subcategorySlug: undefined,
  };
}

export default async function ProductosPage({ searchParams }: Props) {
  const initialFilters = getFiltersFromSearchParams(searchParams || {});
  const initialProducts: ProductWithRelations[] = await getProductsServer({
    take: 12,
    ...initialFilters,
  });

  const allCategories: CategoryWithSubcategories[] = await fetchCategoriesWithSubcategoriesServer();

  return (
    <ProductosClient
      initialProducts={initialProducts}
      allCategories={allCategories}
      initialFilters={initialFilters}
    />
  );
}
