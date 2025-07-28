import ProductCard from "./ProductCard";
import type { Product } from "@/types/productTypes";

export default function ProductList({ products, limit }: { products: Product[]; limit?: number }) {
  const list = limit ? products.slice(0, limit) : products;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
      {list.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
