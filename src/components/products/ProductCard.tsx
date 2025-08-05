import type { Product } from "@/types/productTypes";
import Link from "next/link";
import AddToCartButton from "../cart/AddToCartButton";
import { User } from "@/types/userTypes";

export default function ProductCard({ product, onEdit, user }: { product: Product, onEdit?: () => void; user?: User | null }) {


 return (
    <div className="group flex flex-col gap-2 bg-[var(--card-background-color)] p-3 rounded-xl shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1 relative">
      <Link href={`/productos/${product.id}`} className="block">
        <div
          className="aspect-[3/4] bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        <div>
          <p className="text-[var(--text-primary)] text-base font-semibold">{product.name}</p>
          <p className="text-[var(--text-secondary)] text-sm">${product.price}</p>
        </div>
      </Link>
      <div className="mt-6">
        <AddToCartButton product={product}>Agregar al carrito</AddToCartButton>
      </div>
      {user?.role === "admin" && (
        <button onClick={e => { e.stopPropagation(); onEdit?.()}}
          className="absolute top-2 right-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs hover:bg-yellow-700 transition"
        >
          Editar
        </button>
      )}
    </div>
  );
}