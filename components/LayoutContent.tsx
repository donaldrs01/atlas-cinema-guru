"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const userEmail = auth?.user?.email || "Guest";

  return (
    <>
      <Header userEmail={userEmail} />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1 }}>{children}</main>
      </div>
    </>
  );
}
