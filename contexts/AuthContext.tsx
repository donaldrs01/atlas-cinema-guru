"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

type User = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to access authContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(status === "loading");

  useEffect(() => {
    setUser(session?.user || null);
    setLoading(status === "loading");
  }, [session, status]);

  // Authentication actions
  const login = () => signIn("github"); // Sign in using GitHub
  const logout = () => signOut(); 

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
