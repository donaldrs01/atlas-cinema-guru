"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.user) {
      console.log("User not authenticated - redirecting to login screen");
      router.push("/api/auth/signin");
    }
  }, [auth?.user, router]);

  if (!auth?.user) return null; // Prevent render until user is authenticated
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
