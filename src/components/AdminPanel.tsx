"use client";
import { useEffect, useState } from "react";
import { fetchAdminProducts, fetchAdminUsers, fetchAdminOrders } from "@/services/admin";
import ProductList from "@/components/products/ProductList";
import type { User } from "@/types/userTypes";
import type { Order } from "@/types/orderTypes";
import type { Product } from "@/types/productTypes";
import ProductCard from "./products/ProductCard";
import ProductModal from "@/components/products/ProductModal";

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    fetchAdminProducts().then(setProducts);
    fetchAdminUsers().then(setUsers);
    fetchAdminOrders().then(setOrders);
  }, []);

  function handleSaved(product: Product) {
    setProducts((prev) => {
      const idx = prev.findIndex(p => p.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = product;
        return copy;
      }
      return [product, ...prev];
    });
  }

  function handleDeleted(id: string) {
    setProducts((prev) => prev.filter(p => p.id !== id));
  }

  return (
    <div className="space-y-8">
      <section>
        <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Gestión de productos</h2>
        <button onClick={() => setModalOpen(true)} className="bg-[var(--primary-color)] text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition">Nuevo producto</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} onSaved={handleSaved} />
    </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-4">Usuarios</h2>
        <ul className="bg-white rounded shadow p-4">
          {users.map(u => (
            <li key={u.id} className="flex justify-between py-2 border-b">
              <span>{u.name} ({u.email})</span>
              <span className="font-mono text-xs">{u.role}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-4">Órdenes</h2>
        <ul className="bg-white rounded shadow p-4">
          {orders.map(o => (
            <li key={o.id} className="py-2 border-b">
              <span>Orden #{o.id} - {o.status} - ${o.total}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}