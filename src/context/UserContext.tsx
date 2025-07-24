import { createContext, useContext, useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export const UserContext = createContext(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getSession().then(session => setUser(session?.user || null));
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}