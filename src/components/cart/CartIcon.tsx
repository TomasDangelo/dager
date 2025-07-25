'use client'
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function CartIcon() {
  const { cart } = useCart();
  const count = cart?.items?.length || 0;

  return (
    <Link href="/carrito" className="relative">
      <svg width={28} height={28} fill="none" viewBox="0 0 24 24">
        <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 6h14l-1.5 9h-13L7 6z" stroke="currentColor" strokeWidth={2} />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">{count}</span>
      )}
    </Link>
  );
}