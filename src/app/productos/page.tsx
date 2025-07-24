"use client";
import { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import ProductFilters from "@/components/ProductFilters";
import { fetchProducts } from "@/services/products";

export default function ProductosPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: "", onSale: false, minPrice: 0, maxPrice: 10000 });

  useEffect(() => {
    fetchProducts(filters).then(setProducts);
  }, [filters]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Productos deportivos</h1>
      <ProductFilters filters={filters} setFilters={setFilters} />
      <ProductList products={products} />
    </div>
  );
}