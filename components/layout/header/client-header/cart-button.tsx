"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

export default function CartButton() {
  const cart = useCart();

  const cartItemCount = cart?.CartItem.length || 0;

  return (
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
  );
}
