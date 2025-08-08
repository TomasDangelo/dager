'use client';
import { useState, useEffect } from "react";
import { productSchema } from "@/lib/validation/productSchema";
import { api } from "@/services/api";
import type { ProductWithRelations, CategoryWithSubcategories } from "@/types/productTypes";
import { ZodError } from "zod";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  initialProduct?: Partial<ProductWithRelations>;
  onSaved?: (product: ProductWithRelations) => void;
  onDeleted?: (id: string) => void;
  allCategories: CategoryWithSubcategories[];
}

export default function ProductModal({ open, onClose, initialProduct, onSaved, onDeleted, allCategories }: ProductModalProps) {
  const [form, setForm] = useState<Partial<ProductWithRelations>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setForm(initialProduct);
    } else {
      setForm({});
    }
    setError("");
  }, [initialProduct, open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validación con Zod
      const parsed = productSchema.parse(form);

      let product: ProductWithRelations;
      if (form.id) {
        // Editar
        const res = await api.put(`/admin/products/${form.id}`, parsed);
        product = res.data;
      } else {
        // Crear
        const res = await api.post("/admin/products", parsed);
        product = res.data;
      }
      onSaved?.(product);
      onClose();
    } catch (err: any) {
      if (err instanceof ZodError) {
        setError(err.errors.map(e => e.message).join(", "));
      } else {
        setError(err?.response?.data?.error || "Error al guardar");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!form.id) return;
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    setLoading(true);
    try {
      await api.delete(`/admin/products/${form.id}`);
      onDeleted?.(form.id);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Error al eliminar");
    } finally {
      setLoading(false);
    }
  }

  const selectedCategory = allCategories.find(c =>
    c.subcategories.some(s => s.id === form.subcategoryId)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-[var(--card-background-color)] text-white p-8 rounded-xl shadow-2xl w-full max-w-lg flex flex-col gap-4 relative">
        <button type="button" className="absolute top-2 right-4 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-2">{form.id ? "Editar producto" : "Nuevo producto"}</h2>
        <label className="font-semibold">Nombre
          <input className="p-2 rounded bg-[var(--background-color)] border" placeholder="Nombre" value={form.name || ""} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        </label>
        <label className="font-semibold">Imagen (URL)
          <input className="p-2 rounded bg-[var(--background-color)] border" placeholder="Imagen (URL)" value={form.image || ""} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} required />
        </label>
        <label className="font-semibold">Precio
          <input className="p-2 rounded bg-[var(--background-color)] border" placeholder="Precio" type="number" value={form.price ?? ""} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} required min={0} />
        </label>
        <label className="font-semibold">Stock
          <input className="p-2 rounded bg-[var(--background-color)] border" placeholder="Stock" type="number" value={form.stock ?? ""} onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))} required min={0} />
        </label>

        <label className="font-semibold">Categoría
          <select
            className="p-2 rounded bg-[var(--background-color)] border w-full"
            value={selectedCategory?.id || ''}
            onChange={e => {
              const newCategory = allCategories.find(c => c.id === e.target.value);
              setForm(f => ({ ...f, subcategoryId: newCategory?.subcategories[0]?.id || undefined }));
            }}
            required
          >
            <option value="">Selecciona una categoría</option>
            {allCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </label>

        <label className="font-semibold">Subcategoría
          <select
            className="p-2 rounded bg-[var(--background-color)] border w-full"
            value={form.subcategoryId || ''}
            onChange={e => setForm(f => ({ ...f, subcategoryId: e.target.value || undefined }))}
            required
            disabled={!selectedCategory}
          >
            <option value="">Selecciona una subcategoría</option>
            {selectedCategory?.subcategories.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
        </label>

        <label className="font-semibold">Descripción
          <textarea className="p-2 rounded bg-[var(--background-color)] border" placeholder="Descripción" value={form.description || ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.onSale || false} onChange={e => setForm(f => ({ ...f, onSale: e.target.checked }))} />
          En oferta
        </label>

        <input className="p-2 rounded bg-[var(--background-color)] border" placeholder="Texto de oferta" value={form.saleText || ""} onChange={e => setForm(f => ({ ...f, saleText: e.target.value }))} />
        {error && <span className="text-red-400">{error}</span>}
        <div className="flex gap-2 mt-2">
          <button type="submit" disabled={loading} className="bg-[var(--primary-color)] text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition">{form.id ? "Guardar" : "Crear"}</button>
          {form.id && (
            <button type="button" disabled={loading} onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700 transition">Eliminar</button>
          )}
        </div>
      </form>
    </div>
  );
}