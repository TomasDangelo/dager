'use client'
import { useUser } from "@/hooks/useUser";
import Spinner from './ui/Spinner';
import Link from "next/link";

export default function UserProfile() {
  const { user } = useUser();
  if(!user) return <Spinner/>

  const createdAtDate = user.createdAt ? new Date(user.createdAt) : null;
  return (
    <div className="bg-gray-800 rounded shadow-lg p-6 text-gray-200">
      <p className="font-bold text-xl mb-2">{user.name}</p>
      <p className="text-gray-400 mb-2">{user.email}</p>
      <p className="text-gray-400">Rol: {user.role}</p>
      {createdAtDate && <p className="text-gray-400">Miembro desde: ` ${createdAtDate.toLocaleDateString()}`</p> }

      <div className="bg-red-600 rounded p-2 mt-6 mx-auto text-center max-w-52 hover:bg-red-700 transition-colors duration-200">
        <Link href="/api/auth/signout" className="text-white font-semibold block">
          Cerrar sesión
        </Link>
      </div>
    </div>
  );
}