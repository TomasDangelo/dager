"use client";
import CheckoutForm from "@/components/forms/CheckoutForm";
import { useCart } from "@/hooks/useCart";


export default function CheckoutPage() {
  const { cart } = useCart();

  if (!cart || cart.items.length === 0) {
  return (
  <div className="text-center mt-8">
    <h1 className="text-2xl font-bold mb-4">CNo hay productos en el carrito</h1>
  </div>
  )}
  
  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Finalizar compra</h1>
      <CheckoutForm cart={cart} />
    </div>
  );
}