import { api } from "./api";

export async function login(email: string, password: string) {
  return api.post("/auth/login", { email, password });
}

export async function register(data: { name: string; email: string; password: string }) {
  return api.post("/users", data);
}