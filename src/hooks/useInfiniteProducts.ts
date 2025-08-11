// src/hooks/useInfiniteProducts.ts
'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { api } from "@/services/api";
import type { ProductWithRelations, ProductFilter } from "@/types/productTypes";

export function useInfiniteProducts({
  initialProducts,
  filters,
  pageSize,
}: {
  initialProducts: ProductWithRelations[];
  filters: ProductFilter;
  pageSize: number;
}) {
  const [products, setProducts] = useState<ProductWithRelations[]>(initialProducts || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialProducts.length === pageSize);
  const [loading, setLoading] = useState(false);

  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  useEffect(() => {
    let mounted = true;
    async function fetchFiltered() {
      setLoading(true);
      try {
        const params: any = { skip: 0, take: pageSize };
        if (filters.categorySlug) params.categorySlug = filters.categorySlug;
        if (filters.subcategorySlug) params.subcategorySlug = filters.subcategorySlug;
        if (filters.onSale !== undefined) params.onSale = filters.onSale;
        if (filters.minPrice !== undefined) params.minPrice = filters.minPrice;
        if (filters.maxPrice !== undefined) params.maxPrice = filters.maxPrice;

        const res = await api.get("/products", { params });
        if (!mounted) return;
        setProducts(res.data);
        setPage(1);
        setHasMore(res.data.length === pageSize);
      } catch (err) {
        console.error("Error fetching filtered products", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchFiltered();
    return () => { mounted = false; };
  }, [JSON.stringify(filters), pageSize]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const nextSkip = page * pageSize;
      const params: any = { skip: nextSkip, take: pageSize };
      if (filtersRef.current.categorySlug) params.categorySlug = filtersRef.current.categorySlug;
      if (filtersRef.current.subcategorySlug) params.subcategorySlug = filtersRef.current.subcategorySlug;
      if (filtersRef.current.onSale !== undefined) params.onSale = filtersRef.current.onSale;
      if (filtersRef.current.minPrice !== undefined) params.minPrice = filtersRef.current.minPrice;
      if (filtersRef.current.maxPrice !== undefined) params.maxPrice = filtersRef.current.maxPrice;

      const res = await api.get("/products", { params });
      const newProducts = res.data as ProductWithRelations[];
      setProducts(prev => [...prev, ...newProducts]);
      setHasMore(newProducts.length === pageSize);
      setPage(p => p + 1);
    } catch (err) {
      console.error("Error loading more products", err);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, hasMore, loading]);

  // replaceProduct: reemplaza un producto existente por id (útil en onSaved)
  const replaceProduct = useCallback((updated: ProductWithRelations) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  }, []);

  // infinite scroll listener
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 && hasMore && !loading) loadMore();
    };
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [hasMore, loading, loadMore]);

  return { products, loadMore, hasMore, loading, replaceProduct };
}
