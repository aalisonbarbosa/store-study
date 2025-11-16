import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import UserMenu from "./user-menu";
import { getServerSession } from "next-auth";
import { getCartItemCount } from "@/actions/cart";

interface CartWithCount {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    CartItem: number;
  };
}

export default async function Header() {
  const session = await getServerSession();

  const res: CartWithCount[] = await getCartItemCount();

  const cartItemCount = res.reduce((ac, c) => ac + c._count.CartItem, 0);

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
          <button className="relative p-2 cursor-pointer">
            <Link href="/cart">
              {cartItemCount > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 py-1 px-2 text-[10px] text-stone-50 font-semibold rounded-full">
                  {cartItemCount}
                </div>
              )}
              <ShoppingCart />
            </Link>
          </button>
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
