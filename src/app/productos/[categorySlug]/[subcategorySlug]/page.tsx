// src/app/productos/[categorySlug]/[subcategorySlug]/page.tsx
import ProductosClient from "@/components/products/ProductosClient";
import type { ProductWithRelations, CategoryWithSubcategories, ProductFilter } from "@/types/productTypes";
import { getProductsServer, fetchCategoriesWithSubcategoriesServer } from "@/services/products.server";

type Props = {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductosSubcategoryPage({ params, searchParams }: Props) {
  const { categorySlug, subcategorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  const filters: ProductFilter = {
    categorySlug,
    subcategorySlug,
    onSale: resolvedSearchParams?.onSale === "true" ? true : undefined,
    minPrice: resolvedSearchParams?.minPrice ? Number(resolvedSearchParams.minPrice as string) : undefined,
    maxPrice: resolvedSearchParams?.maxPrice ? Number(resolvedSearchParams.maxPrice as string) : undefined,
  };

  const initialProducts: ProductWithRelations[] = await getProductsServer({
    take: 12,
    ...filters,
  });

  const allCategories: CategoryWithSubcategories[] = await fetchCategoriesWithSubcategoriesServer();

  return (
    <ProductosClient
      initialProducts={initialProducts}
      allCategories={allCategories}
      initialFilters={filters}
    />
  );
}
