import { fetchProducts, fetchCategoriesWithSubcategories } from "@/services/products";
import ProductosClient from "@/components/products/ProductosClient";
import type { ProductWithRelations, CategoryWithSubcategories } from "@/types/productTypes";

type Props = {
  params: {
    categorySlug: string;
    subcategorySlug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ProductosSubcategoryPage({ params, searchParams }: Props) {
  const initialProducts: ProductWithRelations[] = await fetchProducts({
    take: 12,
    ...searchParams,
    categorySlug: params.categorySlug,
    subcategorySlug: params.subcategorySlug,
  });

  const allCategories: CategoryWithSubcategories[] = await fetchCategoriesWithSubcategories();

  const initialFilters = {
    categorySlug: params.categorySlug,
    subcategorySlug: params.subcategorySlug,
    onSale: searchParams?.onSale === "true",
    minPrice: searchParams?.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams?.maxPrice ? Number(searchParams.maxPrice) : undefined,
  };

  return (
    <ProductosClient
      initialProducts={initialProducts}
      allCategories={allCategories}
      initialFilters={initialFilters}
    />
  );
}