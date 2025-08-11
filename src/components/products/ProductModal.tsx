// src/components/products/ProductModal.tsx
'use client';

import { useEffect, useState } from "react";
import { productSchema } from "@/lib/validation/productSchema";
import type { ProductWithRelations } from "@/types/productTypes";
import { createOrUpdateProduct, deleteProductById } from "@/app/_actions/productActions";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  initialProduct?: Partial<ProductWithRelations>;
  onSaved?: (product: ProductWithRelations) => void;
  onDeleted?: (id: string) => void;
}

export default function ProductModal({ open, onClose, initialProduct, onSaved, onDeleted }: ProductModalProps) {
  const [form, setForm] = useState<Partial<ProductWithRelations>>(initialProduct || {});
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // sincronizar cuando cambian las props
  useEffect(() => {
    setForm(initialProduct || {});
    setError("");
  }, [initialProduct, open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validación en el cliente (amigable)
    const parsed = productSchema.safeParse(form);
    if (!parsed.success) {
      setError("Datos inválidos. Revisa los campos.");
      setLoading(false);
      return;
    }

    try {
      // Llamada al server action (se ejecuta en el servidor)
      const saved = await createOrUpdateProduct(parsed.data);
      // saved contiene el producto con relaciones (dependiendo de include en la action)
      onSaved?.(saved as ProductWithRelations);
      onClose();
    } catch (err: any) {
      console.error("Error saving product (server action):", err);
      setError(err?.message || "Error al guardar producto");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!form.id) return;
    if (!confirm("¿Seguro que desea eliminar este producto?")) return;
    setLoading(true);
    try {
      const res = await deleteProductById(form.id as string);
      if (res?.success) {
        onDeleted?.(form.id as string);
        onClose();
      }
    } catch (err: any) {
      console.error("Error delete product:", err);
      setError(err?.message || "Error al eliminar producto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-[var(--card-background-color)] text-white p-6 rounded-xl w-full max-w-lg">
        <button type="button" className="absolute top-4 right-6 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-2">{form.id ? "Editar producto" : "Nuevo producto"}</h2>

        <label className="block mb-2">
          <span className="text-sm font-semibold">Nombre</span>
          <input className="w-full p-2 rounded mt-1 bg-[var(--background-color)] border" value={form.name || ""} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        </label>

        <label className="block mb-2">
          <span className="text-sm font-semibold">Imagen (URL)</span>
          <input className="w-full p-2 rounded mt-1 bg-[var(--background-color)] border" value={form.image || ""} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} required />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label>
            <span className="text-sm font-semibold">Precio</span>
            <input type="number" min={0} className="w-full p-2 rounded mt-1 bg-[var(--background-color)] border" value={form.price ?? ""} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} required />
          </label>
          <label>
            <span className="text-sm font-semibold">Stock</span>
            <input type="number" min={0} className="w-full p-2 rounded mt-1 bg-[var(--background-color)] border" value={form.stock ?? ""} onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))} required />
          </label>
        </div>

        <label className="block my-2">
          <span className="text-sm font-semibold">Descripción</span>
          <textarea className="w-full p-2 rounded mt-1 bg-[var(--background-color)] border" value={form.description || ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        </label>

        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={!!form.onSale} onChange={e => setForm(f => ({ ...f, onSale: e.target.checked }))} />
            <span>En oferta</span>
          </label>
          <input className="p-2 rounded bg-[var(--background-color)] border" placeholder="Texto oferta" value={form.saleText || ""} onChange={e => setForm(f => ({ ...f, saleText: e.target.value }))} />
        </div>

        {error && <div className="text-red-400 mt-2">{error}</div>}

        <div className="flex gap-2 justify-end mt-4">
          {form.id && <button type="button" onClick={handleDelete} disabled={loading} className="bg-red-600 px-4 py-2 rounded">Eliminar</button>}
          <button type="submit" disabled={loading} className="bg-[var(--primary-color)] px-4 py-2 rounded">{loading ? "Guardando..." : (form.id ? "Guardar" : "Crear")}</button>
        </div>
      </form>
    </div>
  );
}
