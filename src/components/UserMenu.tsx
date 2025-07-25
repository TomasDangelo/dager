"use client";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function UserMenu() {
  const {user} = useUser();

  if (!user)
    return (
      <Link href="/login" className="bg-blue-300 text-black px-4 py-2 rounded hover:bg-gray-200">
        Ingresar
      </Link>
    );

  return (
    <div className="flex items-center gap-2">
      <Link href="/dashboard" className="hover:underline">{user.name}</Link>
      <button className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800" onClick={() => signOut()}>
        Salir
      </button>
    </div>
  );
}