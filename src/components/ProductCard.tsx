import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col gap-2 w-full max-w-xs">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <div className="flex flex-col gap-1">
        <span className="font-bold text-lg">{product.name}</span>
        <span className="text-gray-500">{product.category}</span>
        <span className="text-sm">{product.description}</span>
        <span className="font-bold text-xl text-green-600">${product.price}</span>
        {product.onSale && <span className="text-red-500 font-semibold">{product.saleText || "En oferta"}</span>}
        <span className="text-xs text-gray-400">Stock: {product.stock}</span>
      </div>
      <button
        className="bg-black text-white py-2 rounded mt-2 hover:bg-gray-800"
        onClick={() => addToCart(product.id, 1)}
        disabled={product.stock < 1}
      >
        Agregar al carrito
      </button>
    </div>
  );
}