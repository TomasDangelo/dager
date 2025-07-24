"use client";
import { signIn } from "next-auth/react";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>
      <AuthForm />
      <button
        className="w-full mt-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        onClick={() => signIn("google")}
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
}