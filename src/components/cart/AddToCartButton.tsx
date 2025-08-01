'use client';
import { Product } from "@/types/productTypes";
import { useCart } from "@/hooks/useCart";
import { ReactNode, MouseEvent } from "react";

interface AddToCartButtonProps {
    product: Product;
    children: ReactNode;
}

export default function AddToCartButton({ product, children }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const handleAddToCart = (e: MouseEvent) => {
        // Detener la propagación del evento para que no llegue al link padre
        e.stopPropagation(); 
        addToCart(product.id, 1);
    };
    return (
        <button onClick={handleAddToCart} className="cursor-pointer bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition-colors duration-200 uppercase tracking-wide">
            {product.stock < 1 ? "Sin stock" : children}
        </button>
    );
}