"use client";
import UserProfile from "@/components/UserProfile";
import { useUser } from "@/hooks/useUser";

export default function DashboardPage() {
  const {user} = useUser();

  if(!user) return <div><h2>Ocurrió un error cargando tu sesión.</h2></div>

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Mi perfil</h1>
      <UserProfile user={user} />
    </div>
  );
}