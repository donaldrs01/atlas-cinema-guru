"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

type User = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to access authContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(status === "loading");
  const router = useRouter();
  const pathname = usePathname();

  console.log("SESSION STATUS:", status);
  console.log("SESSION DATA:", session);
  console.log("CURRENT PATH:", pathname);

  useEffect(() => {
    if (status === "authenticated") {
      console.log("User authenticated");
      setLoading(false);
    } else if (status === "unauthenticated" && pathname !== "/api/auth/signin") {
      console.log("No user found. Redirecting to login.");
      setLoading(false);
      router.push("/api/auth/signin");
    }
  }, [status, router, pathname]);

  if (loading || status === "loading") return null;

  return (
    <AuthContext.Provider value={{ user: session?.user || null, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
