import { useCart } from "@/hooks/useCart";
import type { CartItem as CartItemType } from "@/types/cartTypes";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateCartItem, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-[var(--card-background-color)] p-4">
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-20"
        style={{ backgroundImage: `url('${item.product.image}')` }}
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[var(--text-primary)] text-base font-semibold">{item.product.name}</p>
            {/* Si tienes variantes como talla, muéstralas aquí */}
            {/* <p className="text-[var(--text-secondary)] text-sm">Talla M</p> */}
          </div>
          <button
            className="text-[var(--text-secondary)] hover:text-[var(--primary-color)]"
            onClick={() => removeFromCart(item.product.id)}
            aria-label="Quitar producto"
          >
            <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20">
              <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Z"></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[var(--text-primary)] text-lg font-bold">${item.product.price}</p>
          <div className="flex items-center gap-2 text-[var(--text-primary)]">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-color)] cursor-pointer text-xl font-light"
              onClick={() => updateCartItem(item.product.id, Math.max(1, item.quantity - 1))}
              disabled={item.quantity <= 1}
              aria-label="Disminuir cantidad"
            >-</button>
            <span className="text-base font-medium w-6 text-center">{item.quantity}</span>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-color)] cursor-pointer text-xl font-light"
              onClick={() => updateCartItem(item.product.id, item.quantity + 1)}
              aria-label="Aumentar cantidad"
              disabled={item.quantity >= item.product.stock}
            >+</button>
          </div>
        </div>
      </div>
    </div>
  );
}