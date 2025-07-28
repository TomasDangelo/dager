import Link from "next/link";
import { fetchProducts } from "@/services/products";
import ProductList from "@/components/products/ProductList";
import type { Product } from "@/types/productTypes";

export default async function HomePage() {
  const products: Product[] = await fetchProducts({ take: 4 });
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  return (
    <div className="bg-[var(--background-color)] font-['Lexend',sans-serif]">
      <main>
        <section className="min-h-[70vh] bg-cover bg-center bg-no-repeat flex flex-col justify-end items-start px-4 pb-10 rounded-xl"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url('https://source.unsplash.com/random/900x600?athletics')"
          }}
        >
          <h2 className="text-gray-200 text-base font-normal">Eleva tu performance.</h2>
          <Link href="/productos" className="btn-primary mt-4">Comprá ahora</Link>
        </section>

        <section className="p-4">
          <h2 className="text-white text-2xl font-bold pb-3 pt-5">Categorías populares</h2>
          <div className="flex overflow-x-auto py-4 gap-4">
            {categories.map(cat => (
              <Link key={cat} href={`/productos?category=${encodeURIComponent(cat)}`} className="min-w-64 flex-shrink-0">
                <div className="aspect-[3/4] bg-cover rounded-xl bg-center"
                  style={{ backgroundImage: `url('https://source.unsplash.com/random/400x600?${cat}')` }}
                >
                  <div className="p-4 bg-gradient-to-t from-black/60 to-transparent h-full flex items-end rounded-xl">
                    <p className="text-white text-xl font-bold">{cat}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4">
          <h2 className="text-white text-2xl font-bold pb-3 pt-5">New Arrivals</h2>
          <ProductList products={products} />
        </section>
      </main>
    </div>
  );
}
