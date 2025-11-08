"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className={`flex items-center gap-2 pl-8 py-4 hover:bg-blue-100 hover:text-blue-700 duration-200 w-full cursor-pointer`}
    >
      <LogOut />
      <span>Sair</span>
    </button>
  );
}
