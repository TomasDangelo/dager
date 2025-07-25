'use client'
import { createContext, useState, useEffect, useCallback } from "react";
import { getSession } from "next-auth/react";
import type { User } from "@/types/userTypes";

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const session = await getSession();
      if (session?.user) {
        setUser(session.user as User);
      } else {
        setUser(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar usuario");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, loading, error, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}