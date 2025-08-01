import ProductDetail from "@/components/products/ProductDetail";
import { Product } from "@/types/productTypes";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { id: string } }) {
    const res = await fetch(`http://localhost:3000/api/products/${params.id}`);

    if (!res.ok) notFound()

    const product: Product = await res.json()

    return <ProductDetail product={product} />
    
}