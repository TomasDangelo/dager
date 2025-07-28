'use client'
import { createContext } from "react";
import { useSession } from "next-auth/react";
import type { User } from "@/types/userTypes";

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  // status: "loading" | "authenticated" | "unauthenticated"
  const user = session?.user as User | null;
  const loading = status === "loading";
  const error = null;

  // refreshUser es innecesario, pero lo dejamos por compatibilidad
  const refreshUser = async () => {};

  return (
    <UserContext.Provider value={{ user, loading, error, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}