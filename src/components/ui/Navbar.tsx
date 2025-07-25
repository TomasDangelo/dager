'use client'
import Link from "next/link";
import { ShoppingCart } from 'lucide-react';
import { useUser } from "@/hooks/useUser";

export default function Navbar() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 bg-[var(--background-color)]/80 backdrop-blur-sm">
      <nav className="flex items-center p-4 pb-2 justify-between">
        <div className="text-white flex size-12 shrink-0 items-center">
          {/* Puedes poner un icono de menú aquí si lo deseas */}
        </div>
        <Link href="/" className="text-2xl font-bold text-white tracking-wider">DÄGER</Link>
        <div className="flex w-12 items-center justify-end relative">
          <Link href="/carrito" className="relative"> <ShoppingCart /></Link>
        </div>
      </nav>
    </header>
  );
}