import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { IoFilmOutline } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const auth = useAuth();
  const userEmail = auth?.user?.email || "Guest";

  return (
    <header className="bg-teal-300 p-4 flex justify-between items-center text-black">
      <div className="flex items-center gap-2">
        <IoFilmOutline className="text-2xl" />
        <Link href="/" className="text-lg font-bold">Cinema Guru</Link>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <span>Welcome, {userEmail || "Guest"}</span>
          <LogoutButton />
      </div>
    </header>
  );
}
