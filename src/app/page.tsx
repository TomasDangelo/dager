// src/app/page.tsx
import Link from "next/link";
import ProductList from "@/components/products/ProductList";
import type { ProductWithRelations } from "@/types/productTypes";
import { getProductsServer, fetchCategoriesWithSubcategoriesServer } from "@/services/products.server";

export default async function HomePage() {
  // servidor: traemos 4 productos para "New Arrivals"
  const products: ProductWithRelations[] = await getProductsServer({ take: 4 });

  // traemos las categorías para armar el carrusel (server)
  const categories = await fetchCategoriesWithSubcategoriesServer();

  // construimos map de imagen por categoría buscando el primer producto que pertenezca a esa categoría
  const categoryImages: Record<string, string> = {};
  categories.forEach(cat => {
    const prod = products.find(p => p.subcategory?.categories?.some(c => c.name === cat.name));
    categoryImages[cat.name] = prod?.image || "/placeholder-category.webp";
  });

  return (
    <div className="bg-[var(--background-color)] font-['Lexend',sans-serif]">
      <main>
        <section className="min-h-[70vh] bg-cover bg-center bg-no-repeat flex flex-col justify-end items-start px-4 pb-10 rounded-xl"
          style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url('https://images.pexels.com/photos/4775192/pexels-photo-4775192.jpeg')" }}>
          <h2 className="text-gray-200 text-4xl font-normal">Eleva tu performance.</h2>
          <Link href="/productos" className="btn-primary mt-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded p-2 text-white">Comprá ahora</Link>
        </section>

        <section className="p-4">
          <h2 className="text-white text-2xl font-bold pb-3 pt-5">Categorías populares</h2>
          <div className="flex overflow-x-auto py-4 gap-4">
            {categories.map(cat => (
              <Link key={cat.id} href={`/productos/${encodeURIComponent(cat.name.toLowerCase())}`} className="min-w-64 flex-shrink-0">
                <div className="aspect-[3/4] bg-cover rounded-xl bg-center" style={{ backgroundImage: `url('${categoryImages[cat.name]}')` }}>
                  <div className="p-4 bg-gradient-to-t from-black/60 to-transparent h-full flex items-end rounded-xl">
                    <p className="text-white text-xl font-bold">{cat.name}</p>
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
