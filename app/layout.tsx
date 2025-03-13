import "@/styles/global.css";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/contexts/AuthContext";
import LayoutContent from "@/components/LayoutContent";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="antialiased  bg-[#00003c] text-white">
        <SessionProvider>
          <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
