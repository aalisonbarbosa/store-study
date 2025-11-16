"use client";

import { addProductToCart } from "@/actions/cart";

export default function AddToCart({ productId }: { productId: string }) {
  return (
    <button
      onClick={() => addProductToCart(productId)}
      className="text-sm bg-blue-700 text-stone-50 p-2 rounded-md z-20 cursor-pointer"
    >
      Adicionar
    </button>
  );
}
