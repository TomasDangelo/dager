'use client'
import { useState, useEffect, useRef } from "react";
import { fetchProducts  } from "@/services/products";
import type { Product } from "@/types/productTypes";
import type { ProductFiltersType } from "@/components/products/ProductosClient";

export function useInfiniteProducts({ initialProducts, filters, pageSize}: { initialProducts: Product[]; filters: ProductFiltersType; pageSize: number;
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialProducts.length === pageSize);
  const [loading, setLoading] = useState(false);
  const filtersRef = useRef(filters);

  useEffect(() => {
    filtersRef.current = filters;
    setLoading(true);
    fetchProducts({ ...filters, skip: 0, take: pageSize }).then((newProducts) => {
      setProducts(newProducts);
      setPage(1);
      setHasMore(newProducts.length === pageSize);
      setLoading(false);
    });
  }, [JSON.stringify(filters), pageSize]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const newProducts = await fetchProducts({
      ...filtersRef.current,
      skip: page * pageSize,
      take: pageSize,
    });
    setProducts((prev) => [...prev, ...newProducts]); // corregido
    setHasMore(newProducts.length === pageSize);
    setPage((p) => p + 1);
    setLoading(false);
  };

  return { products, loadMore, hasMore, loading };
}
