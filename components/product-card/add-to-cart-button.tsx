"use client";

import { addProductToCart } from "@/actions/cart";

export default function AddToCart() {
  return (
    <button
      onClick={() => addProductToCart()}
      className="text-sm bg-blue-700 text-stone-50 p-2 rounded-md z-10 cursor-pointer"
    >
      Adicionar
    </button>
  );
}
