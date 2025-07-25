interface ProductFiltersProps {
  categories: string[];
  filters: {
    category: string;
    onSale: boolean;
    minPrice: number;
    maxPrice: number;
  };
  setFilters: React.Dispatch<React.SetStateAction<ProductFiltersProps["filters"]>>;
}

export default function ProductFilters({ categories, filters, setFilters }: ProductFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select className="border p-2 rounded" value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
        <option value="">Todas las categorías</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={filters.onSale} onChange={e => setFilters(f => ({ ...f, onSale: e.target.checked }))}/>
        En oferta
      </label>
      <input type="number" className="border p-2 rounded w-24" placeholder="Min $" value={filters.minPrice} onChange={e => setFilters(f => ({ ...f, minPrice: Number(e.target.value) }))}/>
      <input type="number" className="border p-2 rounded w-24" placeholder="Max $" value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))}/>
    </div>
  );
}