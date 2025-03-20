"use client";

import { signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";

export default function LogoutButton() {

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
      className="flex items-center space-x-2 text-sm cursor-pointer"
    >
      <IoLogOutOutline className="text-lg" />
      <span>Logout</span>
    </button>
  );
}
