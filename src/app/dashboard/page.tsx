import UserProfile from "@/components/UserProfile";

export default function DashboardPage() {

  return (
    <div className="max-w-2xl mx-auto mt-8 w-full text-white">
      <h1 className="text-3xl font-bold mb-8">Mi perfil</h1>
      <UserProfile />
    </div>
  );
}