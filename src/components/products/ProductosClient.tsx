'use client';

import { useMemo, useState } from "react";
import type { ProductWithRelations, CategoryWithSubcategories, ProductFilter } from "@/types/productTypes";
import ProductFilters from "./ProductFilters";
import ProductList from "./ProductList";
import ProductModal from "./ProductModal";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import Spinner from "@/components/ui/Spinner";
import { useUser } from "@/hooks/useUser";

const PAGE_SIZE = 12;

export default function ProductosClient({
  initialProducts,
  allCategories,
  initialFilters = {},
}: {
  initialProducts: ProductWithRelations[];
  allCategories: CategoryWithSubcategories[];
  initialFilters?: ProductFilter;
}) {
  const [filters, setFilters] = useState<ProductFilter>(initialFilters);
  const [editingProduct, setEditingProduct] = useState<ProductWithRelations | null>(null);
  const { user } = useUser();

  const { products, loadMore, hasMore, loading, replaceProduct } = useInfiniteProducts({
    initialProducts,
    filters,
    pageSize: PAGE_SIZE,
  });

  return (
    <div className="bg-[var(--background-color)] min-h-screen font-['Lexend',sans-serif] p-4">
      <ProductFilters allCategories={allCategories} initialFilters={filters} />
      <ProductList products={products} setEditingProduct={setEditingProduct} user={user} loading={loading} />

      <div className="mt-6 text-center">
        {hasMore && (
          <button onClick={() => loadMore()} className="px-4 py-2 bg-[var(--primary-color)] text-white rounded" disabled={loading}>
            {loading ? "Cargando..." : "Cargar más"}
          </button>
        )}
      </div>

      <ProductModal
        open={!!editingProduct}
        initialProduct={editingProduct ?? undefined}
        onClose={() => setEditingProduct(null)}
        onSaved={(prod) => {
          replaceProduct(prod);
          setEditingProduct(null);
        }}
        onDeleted={(id) => {
          setEditingProduct(null);
        }}
      />
    </div>
  );
}
