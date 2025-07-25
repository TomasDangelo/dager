"use client";
import { useCart } from "@/hooks/useCart";
import CartDrawer from "@/components/cart/CartDrawer";

export default function CarritoPage() {
  const { cart, loading, error } = useCart();

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--background-color)] text-[var(--text-primary)] ">
      <main className="flex-grow">
        <header className="flex items-center p-4">
          <h1 className="flex-1 text-center text-xl font-bold tracking-tight pr-6">Tu carrito</h1>
        </header>
        <div className="px-4 space-y-4">
          {loading && <div className="text-[var(--text-secondary)]">Cargando...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {cart && cart.items.length > 0 ? (
            <CartDrawer cart={cart} />
          ) : (
            <div className="text-center mt-8">
              <h1 className="text-2xl font-bold mb-4">No hay productos en el carrito</h1>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}