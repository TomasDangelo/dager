import { User } from "@/types/userTypes";
import ProductCard from "./ProductCard";
import type { ProductWithRelations  } from "@/types/productTypes";

export default function ProductList({ products, setEditingProduct, user }: { products: ProductWithRelations[], setEditingProduct?: (product: Product) => void, user?: User | null }) {
  if (!products.length) return <div className="text-center text-[var(--text-secondary)] py-8">No hay productos para mostrar.</div>;
  console.log(products)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onEdit={() => setEditingProduct?.(product)} user={user} />
      ))}
    </div>
  );
}