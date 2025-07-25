"use client";
import { useMemo, useState } from "react";
import { checkout } from "@/services/orders";
import { useRouter } from "next/navigation";
import type {Cart} from '@/types/cartTypes';

export default function CheckoutForm({ cart }: { cart: Cart }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  if (!cart || cart.items.length === 0)
    return <div className="bg-white rounded shadow p-4">No hay productos en el carrito.</div>;
  
  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await checkout();
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Error en el checkout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleCheckout} className="bg-white rounded shadow p-4 flex flex-col gap-4">
      <h2 className="font-bold text-lg">Resumen</h2>
      <ul className="divide-y">
        {cart.items.map(item => (
          <li key={item.id} className="py-2 flex justify-between">
            <span>{item.product.name} x {item.quantity}</span>
            <span>${item.product.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="font-bold text-xl mt-4">Total: ${total}</div>
      {error && <span className="text-red-500">{error}</span>}
      <button className="bg-black text-white py-2 rounded hover:bg-gray-800" disabled={loading}>
        {loading ? "Procesando..." : "Confirmar compra"}
      </button>
    </form>
  );
}