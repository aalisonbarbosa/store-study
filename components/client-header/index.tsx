import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import UserMenu from "./user-menu";

export default function Header() {
  return (
    <header className="flex justify-around items-center h-20">
      <Link href="/">
        <h1 className="font-bold text-2xl text-blue-700">Store Study</h1>
      </Link>
      <div className="relative px-4 py-2 border-2 border-stone-200 rounded-lg w-md">
        <Search className="absolute left-2 text-stone-400" />
        <input type="text" placeholder="Buscar produtos..." className="pl-6 focus:outline-none focus:ring-0 w-full" />
      </div>

      <div className="flex items-center gap-2">
        <button className="relative p-2 cursor-pointer">
          <Link href="/cart">
            <div className="absolute top-0 right-0 bg-red-500 py-1 px-2  text-[10px] text-stone-50 font-semibold rounded-full">0</div>
            <ShoppingCart />
          </Link>
        </button>
        <UserMenu />
      </div>
    </header>
  )
}