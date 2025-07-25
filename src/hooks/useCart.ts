'use client'
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse en CartProvider");
  }
  return context;
}