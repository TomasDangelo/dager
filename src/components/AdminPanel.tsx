"use client";
import { useEffect, useState } from "react";
import { fetchAdminProducts, fetchAdminUsers, fetchAdminOrders } from "@/services/admin";
import ProductList from "@/components/products/ProductList";
import type { User } from "@/types/userTypes";
import type { Order } from "@/types/orderTypes";
import type { Product } from "@/types/productTypes";

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchAdminProducts().then(setProducts);
    fetchAdminUsers().then(setUsers);
    fetchAdminOrders().then(setOrders);
  }, []);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-4">Productos</h2>
        <ProductList products={products} />
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