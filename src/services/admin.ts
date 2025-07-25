import { api } from "./api";

export async function fetchAdminProducts() {
  return api.get("/admin/products").then(res => res.data);
}

export async function fetchAdminUsers() {
  return api.get("/admin/users").then(res => res.data);
}

export async function fetchAdminOrders() {
  return api.get("/admin/orders").then(res => res.data);
}