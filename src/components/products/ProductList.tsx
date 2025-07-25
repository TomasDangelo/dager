import ProductCard from "./ProductCard";
import type { Product } from "@/types/productTypes";

export default function ProductList({ products, limit, horizontal = false }: { products: Product[]; limit?: number; horizontal?: boolean }) {
  const list = limit ? products.slice(0, limit) : products;
  return horizontal ? (
    <div className="flex overflow-x-auto py-4 gap-4 px-4">
      {list.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-4 px-4">
      {list.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}