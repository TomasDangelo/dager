import { notFound } from "next/navigation";
import ProductDetail from "@/components/products/ProductDetail";
import { ProductWithRelations } from "@/types/productTypes";

export default async function ProductPage({ params }: { params: { id: string } }) {
    const res = await fetch(`http://localhost:3000/api/products/${params.id}`, { cache: "no-store" });

    if (!res.ok) notFound();

    const product: ProductWithRelations = await res.json();

    return <ProductDetail product={product} />;
}