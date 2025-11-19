import Link from "next/link";
import { getServerSession } from "next-auth";
import { Search } from "lucide-react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import UserMenu from "./user-menu";
import CartButton from "./cart-button";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex justify-around items-center h-20 border-b border-stone-200">
      <Link href="/">
        <h1 className="font-bold text-2xl text-blue-700">Store Study</h1>
      </Link>
      <div className="relative px-4 py-2 border-2 border-stone-200 rounded-lg w-md">
        <Search className="absolute left-2 text-stone-400" />
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="pl-6 focus:outline-none focus:ring-0 w-full"
        />
      </div>
      {session ? (
        <div className="flex items-center gap-2">
          <CartButton />
          <UserMenu />
        </div>
      ) : (
        <button>
          <Link
            href="/login"
            className="text-blue-700 hover:underline duration-200"
          >
            login
          </Link>
        </button>
      )}
    </header>
  );
}
