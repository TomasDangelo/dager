import Link from "next/link";
import AddToCartButton from "../cart/AddToCartButton";
import type { ProductWithRelations } from "@/types/productTypes";
import { User } from "@/types/userTypes";

export default function ProductCard({ product, onEdit, user }: { product: ProductWithRelations; onEdit?: () => void; user?: User | null; }) {
  return (
    <div className="group flex flex-col gap-2 bg-[var(--card-background-color)] p-3 rounded-xl shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1 relative">
      <Link href={`/productos/item/${product.id}`} className="block">
        <div
          className="aspect-[3/4] bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        <div>
          <p className="text-[var(--text-primary)] text-base font-semibold">{product.name}</p>
          <p className="text-[var(--text-secondary)] text-sm">${product.price}</p>
        </div>
      </Link>

      <div className="mt-3 flex gap-2">
        <AddToCartButton product={product}>Agregar</AddToCartButton>
        {user?.role === "admin" && (
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit?.(); }} className="px-3 py-1 bg-yellow-600 text-black rounded">
            Editar
          </button>
        )}
      </div>
    </div>
  );
}
