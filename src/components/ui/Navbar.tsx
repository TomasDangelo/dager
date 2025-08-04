'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, Menu, X, User2Icon, LogInIcon } from "lucide-react";
import { useUser } from "@/hooks/useUser";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Tienda", href: "/productos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const userItems = user? [ { label: "Dashboard", href: "/dashboard", icon: User2Icon, showLabel: false }, { label: "Panel de administrador", href: "/admin", showLabel: true } ]
    : [{ label: "Ingresar", href: "/login", icon: LogInIcon }];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-[var(--background-color)]/80 backdrop-blur-sm">
      <nav className="flex items-center p-4 pb-2 justify-between">
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
        <Link href="/" className="text-2xl font-bold text-white tracking-wider">DÄGER.</Link>
        <div className="hidden md:flex gap-6 items-center">
          {[...NAV_ITEMS].map((item) =>
            item.external ? (
              <a key={item.href} href={item.href} className={`relative text-white font-medium hover:text-gray-300 transition-colors duration-200 after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-[var(--primary-color)] hover:after:w-full after:transition-all after:duration-300 ${isActive(item.href) ? 'text-[var(--primary-color)] after:w-full' : ''}`}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className={`relative text-white font-medium hover:text-gray-300 transition-colors duration-200 after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-[var(--primary-color)] hover:after:w-full after:transition-all after:duration-300 ${isActive(item.href) ? 'text-[var(--primary-color)] after:w-full' : ''}`}>
                {item.label}
              </Link>
            )
          )}
        </div>
        <div className="flex w-16 items-center justify-end cursor-pointer text-white gap-2">
          {userItems.map((item) =>
            item.external ? (
              <a key={item.href} href={item.href} className="block text-white py-2">
                {item.icon ? <item.icon className="inline mr-1" size={18} /> : null}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className="block text-white py-2">
                {item.icon ? <item.icon className="inline mr-1" size={18} /> : null}
                { item.showLabel ? item.label : null}
              </Link>
            )
          )}
           <Link href="/carrito" className="relative"> 
            <ShoppingCart />
           </Link>
        </div>
      </nav>
      {open && (
        <div className="md:hidden bg-[var(--background-color)] border-t border-gray-700 px-4 py-2 space-y-2">
          {[...NAV_ITEMS, ...userItems].map((item) =>
            item.external ? (
              <a key={item.href} href={item.href} className="block text-white py-2 hover:text-gray-400 transition-colors duration-200">{item.label}</a>
            ) : (
              <Link key={item.href} href={item.href} className="block text-white py-2 hover:text-gray-400 transition-colors duration-200">{item.label}</Link>
            )
          )}
        </div>
      )}
    </header>
  );
}