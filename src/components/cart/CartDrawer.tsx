import CartItem from "./CartItem";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import type { Cart } from "@/types/cartTypes";
import { useMemo } from "react";

export default function CartDrawer({ cart }: { cart: Cart }) {
  const { clearCart } = useCart();

  const subtotal = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart.items]
  );

  return (
    <>
      <ul className="space-y-4">
        {cart.items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      {/* Footer resumen */}
      <footer className="sticky bottom-0 bg-[var(--background-color)] pt-4 pb-6 px-4">
        <div className="space-y-2 border-t border-t-zinc-800 pt-4">
          <div className="flex justify-between">
            <p className="text-[var(--text-secondary)]">Subtotal</p>
            <p className="text-[var(--text-primary)] font-medium">${subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[var(--text-secondary)]">Envío</p>
            <p className="text-[var(--text-primary)] font-medium">Gratis</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[var(--text-secondary)]">Impuestos</p>
            <p className="text-[var(--text-primary)] font-medium">Calculados al finalizar</p>
          </div>
        </div>
        <div className="flex justify-between mt-4 pt-4 border-t border-t-zinc-800">
          <p className="text-[var(--text-primary)] text-lg font-bold">Total</p>
          <p className="text-[var(--text-primary)] text-lg font-bold">${subtotal}</p>
        </div>
        <Link
          href="/checkout"
          className="w-full mt-6 rounded-full h-14 bg-[var(--primary-color)] text-[var(--text-primary)] text-lg font-bold tracking-wide flex items-center justify-center"
        >
          Checkout
        </Link>
        <button
          className="w-full mt-2 rounded-full h-12 bg-[var(--accent-color)] text-[var(--text-primary)] text-base font-medium tracking-wide"
          onClick={clearCart}
        >
          Vaciar carrito
        </button>
      </footer>
    </>
  );
}