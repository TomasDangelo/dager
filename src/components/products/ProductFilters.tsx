"use client";
import type { ProductFiltersType, CategoryWithSubcategories } from "@/types/productTypes";
import { useRouter, usePathname } from "next/navigation";

interface ProductFiltersProps {
  allCategories: CategoryWithSubcategories[];
  initialFilters: ProductFiltersType;
}

export default function ProductFilters({ allCategories, initialFilters }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleFilterChange = (newFilters: Partial<ProductFiltersType>) => {
    const filters = { ...initialFilters, ...newFilters };
    const query = new URLSearchParams();

    if (filters.onSale) query.set('onSale', 'true');
    if (filters.minPrice) query.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) query.set('maxPrice', filters.maxPrice.toString());
    
    // Construir la nueva URL con los filtros de categoría/subcategoría
    let newPath = '/productos';
    if (filters.categorySlug) {
      newPath += `/${filters.categorySlug}`;
      if (filters.subcategorySlug) {
        newPath += `/${filters.subcategorySlug}`;
      }
    }

    router.push(`${newPath}?${query.toString()}`);
  };

  const selectedCategory = allCategories.find(c => c.name.toLowerCase() === initialFilters.categorySlug);

  return (
    <div className="flex flex-wrap gap-4 mb-6 bg-[var(--card-background-color)] p-4 rounded-xl shadow">
      {/* Filtro por Categoría Principal */}
      <select
        className="border p-2 rounded bg-[var(--background-color)] text-white"
        value={initialFilters.categorySlug || ""}
        onChange={e => handleFilterChange({ categorySlug: e.target.value || undefined, subcategorySlug: undefined })}
      >
        <option value="">Todas las categorías</option>
        {allCategories.map(c => (
          <option key={c.id} value={c.name.toLowerCase()}>{c.name}</option>
        ))}
      </select>

      {/* Filtro por Subcategoría */}
      {selectedCategory && (
        <select
          className="border p-2 rounded bg-[var(--background-color)] text-white"
          value={initialFilters.subcategorySlug || ""}
          onChange={e => handleFilterChange({ subcategorySlug: e.target.value || undefined })}
        >
          <option value="">Todas las subcategorías</option>
          {selectedCategory.subcategories.map(s => (
            <option key={s.id} value={s.name.toLowerCase()}>{s.name}</option>
          ))}
        </select>
      )}

      {/* Otros filtros */}
      <label className="flex items-center gap-2 text-white">
        <input 
          type="checkbox" 
          checked={initialFilters.onSale || false} 
          onChange={e => handleFilterChange({ onSale: e.target.checked })}
        />
        En oferta
      </label>
      <input 
        type="number" 
        className="border p-2 rounded w-24 bg-[var(--background-color)] text-white" 
        placeholder="Min $" 
        value={initialFilters.minPrice ?? ""} 
        onChange={e => handleFilterChange({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
      />
      <input 
        type="number" 
        className="border p-2 rounded w-24 bg-[var(--background-color)] text-white" 
        placeholder="Max $" 
        value={initialFilters.maxPrice ?? ""} 
        onChange={e => handleFilterChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
      />
    </div>
  );
}