import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";
import { IoFilmOutline } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  userEmail: string;
}

export default function Header({ userEmail }: HeaderProps) {
  const auth = useAuth();

  return (
    <header className="bg-teal-300 p-4 flex justify-between items-center text-black">
      <div className="flex items-center gap-2">
        <IoFilmOutline className="text-2xl" />
        <Link href="/" className="text-lg font-bold">Cinema Guru</Link>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <span>Welcome, {userEmail || "Guest"}</span>
        <button onClick={auth?.logout} className="flex items-center cursor-pointer">
          <IoLogOutOutline className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
