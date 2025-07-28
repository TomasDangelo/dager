"use client";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/productTypes";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col gap-2 bg-[var(--card-background-color)] p-3 rounded-lg shadow hover:shadow-lg transition-shadow transform hover:-translate-y-1">
      <div
        className="aspect-[3/4] bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url('${product.image}')` }}
      />
      <div>
        <p className="text-[var(--text-primary)] text-base font-medium">{product.name}</p>
        <p className="text-[var(--text-secondary)] text-sm">${product.price}</p>
      </div>
      <button
        className="mt-2 rounded-full bg-[var(--primary-color)] text-white py-2 font-bold hover:bg-blue-600 transition-colors"
        onClick={() => addToCart(product.id, 1)}
        disabled={product.stock < 1}
      >
        {product.stock < 1 ? "Sin stock" : "Agregar al carrito"}
      </button>
    </div>
  );
}
