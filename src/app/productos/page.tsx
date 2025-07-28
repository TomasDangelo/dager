"use client";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect, useCallback } from "react";
import ProductFilters from "@/components/products/ProductFilters";
import ProductList from "@/components/products/ProductList";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import type { Product } from "@/types/productTypes";

export default function ProductosPage() {
  const params = useSearchParams();
  const initialCategory = params.get("category") || "";
  const [filters, setFilters] = useState({ category: initialCategory, onSale: false, minPrice: 0, maxPrice: 10000 });
  const { products, loadMore, hasMore, loading } = useInfiniteProducts(filters);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => p.category && set.add(p.category));
    return Array.from(set);
  }, [products]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 && hasMore) {
      loadMore();
    }
  }, [loadMore, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="bg-[var(--background-color)] min-h-screen font-['Lexend',sans-serif] p-4">
      <ProductFilters categories={categories} filters={filters} setFilters={setFilters} />
      <ProductList products={products} />
      {loading && <div className="text-white text-center py-4">Cargando más productos...</div>}
    </div>
  );
}
