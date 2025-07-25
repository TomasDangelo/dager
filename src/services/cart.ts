import { api } from "./api";

export async function getCart() {
  return api.get("/cart").then(res => res.data);
}

export async function addToCart(productId: string, quantity: number) {
  return api.post("/cart", { productId, quantity }).then(res => res.data);
}

export async function updateCartItem(productId: string, quantity: number) {
  return api.patch("/cart", { productId, quantity }).then(res => res.data);
}

export async function removeFromCart(productId: string) {
  return api.delete("/cart", { data: { productId } }).then(res => res.data);
}

export async function clearCart() {
  return api.put("/cart").then(res => res.data);
}