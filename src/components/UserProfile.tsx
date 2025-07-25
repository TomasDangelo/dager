import type {User} from '@/types/userTypes'

export default function UserProfile({ user } : {user: User}) {
  if (!user) return <div>No has iniciado sesión.</div>;
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="font-bold text-lg mb-2">{user.name}</div>
      <div className="text-gray-500 mb-2">{user.email}</div>
      <div className="text-xs text-gray-400">Rol: {user.role}</div>
      <div className="text-xs text-gray-400">ID: {user.id}</div>
    </div>
  );
}