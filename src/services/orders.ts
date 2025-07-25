import { api } from "./api";

export async function fetchOrders() {
  return api.get("/orders").then(res => res.data);
}

export async function checkout() {
  return api.post("/checkout").then(res => res.data);
}