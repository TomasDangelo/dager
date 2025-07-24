import { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "@/services/cart";

export const CartContext = createContext(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    getCart().then(setCart);
  }, []);

  const refreshCart = () => getCart().then(setCart);

  return (
    <CartContext.Provider value={{ cart, refreshCart, addToCart, updateCartItem, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}