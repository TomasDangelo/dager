'use client'
import { useEffect, useState, useCallback, useMemo } from "react";
import ProductList from "@/components/products/ProductList";
import ProductFilters from "@/components/products/ProductFilters";
import { fetchProducts } from "@/services/products";
import type { Product } from "@/types/productTypes";

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({ category: "", onSale: false, minPrice: 0, maxPrice: 10000});

  const fetchFilteredProducts = useCallback(() => {
    fetchProducts(filters).then(setProducts);
  }, [filters]);

  useEffect(() => {
    fetchFilteredProducts();
  }, [fetchFilteredProducts]);

  const categories = useMemo(()=>{
    const set = new Set<string>();
    products.forEach(p=> p.category && set.add(p.category))
    return Array.from(set)
  }, [products])

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--background-color)] font-['Lexend',sans-serif]">
      <main className="p-4">
        {/* Hero producto destacado */}
        <div className="flex flex-col items-stretch justify-start rounded-xl mb-8 bg-[var(--card-background-color)] overflow-hidden">
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAJ8BABWKBDTpXkdmmYTf0CDrYNW7Jy8YHcrMe10KvpIOJ9W_M4XAHar5Okqp3CT97x4wGCDNgRO1uJPQjwQdiMW3-Yf8Vy4Pbxuu6_s_GSo4Lb_Meztn_9J0Opls-AheBbi4-cQQXVuiqjmdEKkWDeyhOsbCAhdbs2429VGgZG5u5PqrJYfwMIibig5cgWeE75OK8JYZRk_VHsNJF7Vu7LOR98bWY6E6OKDL2iH0dUZrraUR4qAM5jUt4UfMaaF1Z_iqcnGnyZcnQ')"
            }}
          />
          <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-2 p-4">
            <h2 className="text-[var(--text-primary)] text-xl font-bold">Däger Air Max Pulse</h2>
            <p className="text-[var(--text-secondary)] text-base font-normal">
              Step into the future with the Däger Air Max Pulse, featuring a sleek design and responsive cushioning for ultimate comfort and style.
            </p>
            <p className="text-[var(--primary-color)] text-base font-medium">100+ colors</p>
          </div>
        </div>
        {/* Filtros */}
        <ProductFilters categories={categories} filters={filters} setFilters={setFilters} />
        {/* Productos destacados */}
        <section>
          <h2 className="text-[var(--text-primary)] text-[22px] font-bold px-4 pb-3 pt-5">Featured</h2>
          <ProductList products={products.filter(p => p.onSale)} horizontal />
        </section>
        {/* Nuevos productos */}
        <section>
          <h2 className="text-[var(--text-primary)] text-[22px] font-bold px-4 pb-3 pt-5">New Arrivals</h2>
          <ProductList products={products} />
        </section>
      </main>
    </div>
  );
}