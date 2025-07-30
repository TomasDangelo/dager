import type { ProductFiltersType } from "./ProductosClient";
export default function ProductFilters({ categories, filters, setFilters }: {
  categories: string[];
  filters:    ProductFiltersType;
  setFilters: (f: ProductFiltersType) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 bg-[var(--card-background-color)] p-4 rounded-xl shadow">
      <select className="border p-2 rounded bg-[var(--background-color)] text-white" value={filters.category || ""} onChange={e => setFilters({ ...filters, category: e.target.value })}>
        <option value="">Todas las categorías</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <label className="flex items-center gap-2 text-white">
        <input type="checkbox" checked={filters.onSale || false} onChange={e => setFilters({ ...filters, onSale: e.target.checked })}/>
        En oferta
      </label>
      <input type="number" className="border p-2 rounded w-24 bg-[var(--background-color)] text-white" placeholder="Min $" value={filters.minPrice ?? ""} onChange={e => setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}/>
      <input type="number" className="border p-2 rounded w-24 bg-[var(--background-color)] text-white" placeholder="Max $" value={filters.maxPrice ?? ""} onChange={e => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}/>
    </div>
  );
}