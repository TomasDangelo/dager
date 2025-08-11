'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, Menu, X, User2Icon, LogInIcon, ChevronDown } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import type { CategoryWithSubcategories } from "@/types/productTypes";

const NAV_ITEMS = [{ label: "Inicio", href: "/" }];

export default function Navbar({ categoriesWithSubcategories = [] }: { categoriesWithSubcategories?: CategoryWithSubcategories[] }) {
  const pathname = usePathname();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userItems = user ? [
    { label: "Dashboard", href: "/dashboard", icon: User2Icon, showLabel: false },
    { label: "Panel de administrador", href: "/admin", showLabel: true }
  ] : [{ label: "Ingresar", href: "/login", icon: LogInIcon }];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-[var(--background-color)]/80 backdrop-blur-sm">
      <nav className="flex items-center p-4 pb-2 justify-between">
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        <Link href="/" className="text-2xl font-bold text-white tracking-wider">DÄGER.</Link>

        <div className="hidden md:flex gap-6 items-center">
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href} className={`relative text-white font-medium hover:text-gray-300 transition-colors duration-200 ${isActive(item.href) ? 'text-[var(--primary-color)]' : ''}`}>
              {item.label}
              <span className={`block h-[2px] bg-[var(--primary-color)] transition-all duration-300 ${isActive(item.href) ? 'w-full' : 'w-0'}`} />
            </Link>
          ))}

          <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className="flex items-center text-white font-medium hover:text-gray-300 transition-colors duration-200">
              Tienda <ChevronDown size={16} className="ml-1" />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-[var(--card-background-color)] rounded-xl shadow-lg p-2 min-w-[200px]">
                <Link href="/productos" className="block p-2 text-white hover:bg-gray-700 rounded transition-colors duration-200">
                  Todas las categorías
                </Link>
                {categoriesWithSubcategories.map(cat => (
                  <div key={cat.id}>
                    <Link href={`/productos/${encodeURIComponent(cat.name.toLowerCase())}`} className="block p-2 text-white font-semibold hover:bg-gray-700 rounded transition-colors duration-200">
                      {cat.name}
                    </Link>
                    {cat.subcategories.map(sub => (
                      <Link key={sub.id} href={`/productos/${encodeURIComponent(cat.name.toLowerCase())}/${encodeURIComponent(sub.name.toLowerCase())}`} className="block pl-6 p-2 text-gray-400 hover:bg-gray-700 rounded transition-colors duration-200">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex w-16 items-center justify-end cursor-pointer text-white gap-2">
          {userItems.map(item => (
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
          ))}
          <Link href="/carrito" className="relative"><ShoppingCart /></Link>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-[var(--background-color)] border-t border-gray-700 px-4 py-2 space-y-2">
          {NAV_ITEMS.map(item => <Link key={item.href} href={item.href} className="block text-white py-2 hover:text-gray-400">{item.label}</Link>)}
          {categoriesWithSubcategories.map(cat => (
            <div key={cat.id}>
              <Link href={`/productos/${encodeURIComponent(cat.name.toLowerCase())}`} className="block text-white py-2 hover:text-gray-400">{cat.name}</Link>
              {cat.subcategories.map(sub => (
                <Link key={sub.id} href={`/productos/${encodeURIComponent(cat.name.toLowerCase())}/${encodeURIComponent(sub.name.toLowerCase())}`} className="block pl-4 text-gray-400 py-2 hover:text-gray-400">
                  {sub.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
