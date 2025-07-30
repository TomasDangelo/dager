"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import ProductFilters from "@/components/products/ProductFilters";
import ProductList from "@/components/products/ProductList";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import type { Product } from "@/types/productTypes";

const PAGE_SIZE = 12;

export type ProductFiltersType = {
  category?: string;
  onSale?: boolean;
  minPrice?: number;
  maxPrice?: number;
};

export default function ProductosClient({ initialProducts, initialCategories,}: { initialProducts: Product[]; initialCategories: string[];}) {
  // Estado de filtros
  const [filters, setFilters] = useState<ProductFiltersType>({});

  // Hook de productos infinitos
  const { products, loadMore, hasMore, loading } = useInfiniteProducts({
    initialProducts,
    filters,
    pageSize: PAGE_SIZE,
  });

  // Categorías únicas (de iniciales y de productos actuales)
  const categories = useMemo(() => {
    const set = new Set<string>(initialCategories);
    products.forEach((p) => p.category && set.add(p.category));
    return Array.from(set);
  }, [products, initialCategories]);

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
      <ProductFilters categories={categories} filters={filters} setFilters={setFilters} />
      <ProductList products={products} />
    </div>
  );
}