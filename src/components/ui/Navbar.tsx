"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useUser } from "@/hooks/useUser";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Tienda", href: "/productos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const userItems = user
    ? [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Salir", href: "/api/auth/signout", external: true },
      ]
    : [{ label: "Ingresar", href: "/login" }];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-[var(--background-color)]/80 backdrop-blur-sm">
      <nav className="flex items-center p-4 pb-2 justify-between">
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
        <Link href="/" className="text-2xl font-bold text-white tracking-wider">DÄGER.</Link>
        <div className="hidden md:flex gap-6 items-center">
          {[...NAV_ITEMS, ...userItems].map((item) =>
            item.external ? (
              <a key={item.href} href={item.href} className={`nav-link ${isActive(item.href) ? 'active' : ''}`}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className={`nav-link ${isActive(item.href) ? 'active' : ''}`}>
                {item.label}
              </Link>
            )
          )}
        </div>
        <div className="flex w-12 items-center justify-end cursor-pointer text-white">
          <ShoppingCart />
        </div>
      </nav>
      {open && (
        <div className="md:hidden bg-[var(--background-color)] border-t border-[var(--accent-color)] px-4 py-2 space-y-2">
          {[...NAV_ITEMS, ...userItems].map((item) =>
            item.external ? (
              <a key={item.href} href={item.href} className="block text-white py-2">{item.label}</a>
            ) : (
              <Link key={item.href} href={item.href} className="block text-white py-2">{item.label}</Link>
            )
          )}
        </div>
      )}
      <style jsx>{`
        .nav-link {
          position: relative;
          color: white;
          font-weight: 500;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          height: 2px;
          width: 0%;
          background-color: var(--primary-color);
          transition: width 0.3s ease-in-out;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .nav-link.active {
          color: var(--primary-color);
        }
      `}</style>
    </header>
  );
}
