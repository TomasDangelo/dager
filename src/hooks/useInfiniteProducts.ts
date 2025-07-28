"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "@/services/products";
import type { Product } from "@/types/productTypes";

export function useInfiniteProducts(filters: any) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const newProducts = await fetchProducts({ ...filters, skip: page * 12, take: 12 });
    setProducts(prev => [...prev, ...newProducts]);
    setHasMore(newProducts.length > 0);
    setPage(p => p + 1);
    setLoading(false);
  }, [filters, page, hasMore, loading]);

  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
  }, [filters]);

  return { products, loadMore, hasMore, loading };
}
