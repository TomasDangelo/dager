import { ProductWithRelations } from "@/types/productTypes";
import AddToCartButton from "../cart/AddToCartButton";

export default function ProductDetail({ product }: { product: ProductWithRelations }) {

    if (!product) return <p className="text-gray-400 text-center mt-10">Producto no encontrado</p>;


    return (
        <div className="bg-[var(--card-background-color)] text-gray-200 p-6 rounded-xl shadow-2xl max-w-4xl mx-auto my-12 flex flex-col md:flex-row gap-8 items-center md:items-start overflow-hidden">
            <div className="md:w-1/2 w-full flex justify-center items-center h-[400px] md:h-[500px]">
                <img src={product.image} alt={product.name} className="object-contain max-h-full rounded-lg" />
            </div>
            <div className="md:w-1/2 w-full flex flex-col gap-4">
                <h1 className="text-4xl font-extrabold text-white">{product.name}</h1>
                <p className="text-gray-400 text-lg">{product.description}</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-white">${product.price}</p>
                    {product.onSale && <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">¡En oferta!</span>}
                </div>
                <p className="text-gray-400">Stock: <span className="font-semibold">{product.stock}</span></p>
                {product.subcategory && (
                    <p className="text-gray-400">
                        Categoría: <span className="font-semibold">{product.subcategory.categories[0]?.name}</span>
                        {" / "}
                        Subcategoría: <span className="font-semibold">{product.subcategory.name}</span>
                    </p>
                )}
                
                <div className="mt-6">
                  <AddToCartButton product={product}>
                    Agregar al carrito
                  </AddToCartButton>
                </div>
            </div>
        </div>
    );
}