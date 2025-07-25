"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

//Form de login para usuarios
export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) setError("Credenciales inválidas");
    else router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="email" placeholder="Email" className="border p-2 rounded" value={email} onChange={e => setEmail(e.target.value)} required/>
      <input type="password" placeholder="Contraseña" className="border p-2 rounded" value={password} onChange={e => setPassword(e.target.value)} required/>
      {error && <span className="text-red-500">{error}</span>}
      <button className="bg-black text-white py-2 rounded hover:bg-gray-800 cursor-pointer">Ingresar</button>
    </form>
  );
}