'use client';
import type { ProductFilter, CategoryWithSubcategories } from "@/types/productTypes";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductFiltersProps {
  allCategories: CategoryWithSubcategories[];
  initialFilters: ProductFilter;
}

export default function ProductFilters({ allCategories, initialFilters }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [localFilters, setLocalFilters] = useState<ProductFilter>(initialFilters);

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  // Build URL and replace (no history entry)
  const pushFiltersToUrl = (updated: ProductFilter) => {
    const query = new URLSearchParams();
    if (updated.onSale) query.set("onSale", "true");
    if (updated.minPrice !== undefined) query.set("minPrice", String(updated.minPrice));
    if (updated.maxPrice !== undefined) query.set("maxPrice", String(updated.maxPrice));

    // Build path
    let newPath = "/productos";
    if (updated.categorySlug) {
      newPath += `/${updated.categorySlug}`;
      if (updated.subcategorySlug) newPath += `/${updated.subcategorySlug}`;
    }
    const q = query.toString();
    router.replace(q ? `${newPath}?${q}` : newPath);
  };

  const handleFilterChange = (newPartial: Partial<ProductFilter>) => {
    const updated = { ...localFilters, ...newPartial };
    setLocalFilters(updated);
    pushFiltersToUrl(updated);
  };

  const selectedCategory = allCategories.find(c => c.name.toLowerCase() === (localFilters.categorySlug || ""));

  return (
    <div className="flex flex-wrap gap-4 mb-6 bg-[var(--card-background-color)] p-4 rounded-xl shadow">
      <select
        className="border p-2 rounded bg-[var(--background-color)] text-white"
        value={localFilters.categorySlug || ""}
        onChange={e => handleFilterChange({ categorySlug: e.target.value || undefined, subcategorySlug: undefined })}
      >
        <option value="">Todas las categorías</option>
        {allCategories.map(c => (
          <option key={c.id} value={c.name.toLowerCase()}>{c.name}</option>
        ))}
      </select>

      {selectedCategory && (
        <select className="border p-2 rounded bg-[var(--background-color)] text-white" value={localFilters.subcategorySlug || ""} onChange={e => handleFilterChange({ subcategorySlug: e.target.value || undefined })}>
          <option value="">Todas las subcategorías</option>
          {selectedCategory.subcategories.map(s => (
            <option key={s.id} value={s.name.toLowerCase()}>{s.name}</option>
          ))}
        </select>
      )}

      <label className="flex items-center gap-2 text-white">
        <input type="checkbox" checked={localFilters.onSale || false} onChange={e => handleFilterChange({ onSale: e.target.checked || undefined })}/>
        En oferta
      </label>

      <input type="number" className="border p-2 rounded w-24 bg-[var(--background-color)] text-white" placeholder="Min $" value={localFilters.minPrice ?? ""} onChange={e => handleFilterChange({ minPrice: e.target.value ? Number(e.target.value) : undefined })}/>
      <input type="number" className="border p-2 rounded w-24 bg-[var(--background-color)] text-white" placeholder="Max $" value={localFilters.maxPrice ?? ""} onChange={e => handleFilterChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}/>
    </div>
  );
}
