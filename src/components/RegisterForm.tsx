"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/users", form);
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al registrar");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Nombre"
        className="border p-2 rounded"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="border p-2 rounded"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />
      {error && <span className="text-red-500">{error}</span>}
      <button className="bg-black text-white py-2 rounded hover:bg-gray-800">Registrarse</button>
    </form>
  );
}