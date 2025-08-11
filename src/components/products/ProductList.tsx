import ProductCard from "./ProductCard";
import type { ProductWithRelations } from "@/types/productTypes";
import { User } from "@/types/userTypes";
import Spinner from "../ui/Spinner";

export default function ProductList({ products, setEditingProduct, user, loading }: { products: ProductWithRelations[]; setEditingProduct?: (p: ProductWithRelations) => void; user?: User | null; loading: boolean; }) {
  if (!products.length) return <div className="text-center text-[var(--text-secondary)] py-8">No hay productos para mostrar.</div>;
  if (loading) return <Spinner/>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onEdit={() => setEditingProduct?.(product)} user={user} />
      ))}
    </div>
  );
}
