'use client'
import { createContext, useState, useEffect } from "react";
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "@/services/cart";
import type { Cart } from "@/types/cartTypes";

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCart();
      setCart(data);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Error al cargar el carrito");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const refreshCart = fetchCart;

  //Add to cart optimistia para actualizar el estado local inmediatamente y luego sincronizar 
 const addToCartHandler = async (productId: string, quantity: number) => {
  setCart(prev => {
    if (!prev) return prev;
    const itemIdx = prev.items.findIndex(i => i.productId === productId);
    if (itemIdx >= 0) {
      const items = [...prev.items];
      items[itemIdx] = { ...items[itemIdx], quantity: items[itemIdx].quantity + quantity };
      return { ...prev, items };
    }
    // Si no existe, agrega el producto 
    return { ...prev, items: [...prev.items, { productId, quantity }] };
  });
  try {
    await addToCart(productId, quantity);
    await fetchCart();
  } catch (err) {
    await fetchCart(); // Rollback si hay error
  }
};

  const updateCartItemHandler = async (productId: string, quantity: number) => {
    setLoading(true);
    setError(null);
    try {
      await updateCartItem(productId, quantity);
      await fetchCart();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Error al actualizar cantidad");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCartHandler = async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      await removeFromCart(productId);
      await fetchCart();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Error al quitar producto");
    } finally {
      setLoading(false);
    }
  };

  const clearCartHandler = async () => {
    setLoading(true);
    setError(null);
    try {
      await clearCart();
      await fetchCart();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Error al vaciar carrito");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        refreshCart,
        addToCart: addToCartHandler,
        updateCartItem: updateCartItemHandler,
        removeFromCart: removeFromCartHandler,
        clearCart: clearCartHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}