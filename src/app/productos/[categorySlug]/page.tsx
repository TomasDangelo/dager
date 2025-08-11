import ProductosClient from "@/components/products/ProductosClient";
import type { ProductWithRelations, CategoryWithSubcategories, ProductFilter } from "@/types/productTypes";
import { getProductsServer, fetchCategoriesWithSubcategoriesServer } from "@/services/products.server";

type Props = {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductosCategoryPage({ params, searchParams }: Props) {
  const { categorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  const filters: ProductFilter = {
    categorySlug,
    onSale: resolvedSearchParams?.onSale === "true" ? true : undefined,
    minPrice: resolvedSearchParams?.minPrice ? Number(resolvedSearchParams.minPrice as string) : undefined,
    maxPrice: resolvedSearchParams?.maxPrice ? Number(resolvedSearchParams.maxPrice as string) : undefined,
    subcategorySlug: undefined,
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
