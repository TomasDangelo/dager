"use client";
import { useState, useMemo, useEffect } from "react";
import ProductFilters from "@/components/products/ProductFilters";
import ProductList from "@/components/products/ProductList";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import type { ProductWithRelations, CategoryWithSubcategories } from "@/types/productTypes";
import ProductModal from "./ProductModal";
import { useUser } from "@/hooks/useUser";
const PAGE_SIZE = 12;

export type ProductFiltersType = {
  categorySlug?: string;
  subcategorySlug?: string;
  onSale?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

interface ProductosClientProps {
  initialProducts: ProductWithRelations[];
  allCategories: CategoryWithSubcategories[];
  initialFilters: ProductFiltersType;
}

export default function ProductosClient({ initialProducts, allCategories, initialFilters }: ProductosClientProps) {
  const [editingProduct, setEditingProduct] = useState<ProductWithRelations | null>(null);
  const { user } = useUser();

  // Hook de productos infinitos
  const { products, loadMore, hasMore, loading } = useInfiniteProducts({
    initialProducts,
    filters: initialFilters,
    pageSize: PAGE_SIZE,
  });

  // Scroll infinito: carga más productos al llegar cerca del final
useEffect(() => {
  let timer: NodeJS.Timeout;
  const onScroll = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 && hasMore && !loading) {
        loadMore();
      }
    }, 200); // 200 ms de debounce
  };
  window.addEventListener("scroll", onScroll);
  return () => {
    clearTimeout(timer);
    window.removeEventListener("scroll", onScroll);
  };
}, [loadMore, hasMore, loading]);


  return (
    <div className="bg-[var(--background-color)] min-h-screen font-['Lexend',sans-serif] p-4">
      <ProductFilters allCategories={allCategories} initialFilters={initialFilters} />
      <ProductList products={products} setEditingProduct={setEditingProduct} user={user} />
      <ProductModal open={!!editingProduct} initialProduct={editingProduct || undefined} onClose={() => setEditingProduct(null)} onSaved={() => setEditingProduct(null)} onDeleted={() => setEditingProduct(null)}/>
    </div>
  );
}