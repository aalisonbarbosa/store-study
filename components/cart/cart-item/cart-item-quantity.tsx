"use client";

import { useCartDispatch } from "@/context/cart-context";
import {
  addProductToCart,
  CartItem,
  decrementProductInCart,
  removeProductFromCart,
} from "@/modules/cart";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function CartItemQuantity({ item }: { item: CartItem }) {
  const dispatch = useCartDispatch();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => {
          dispatch({ type: "decrement", id: item.id });
          decrementProductInCart(item.Product.id);
        }}
        disabled={item.quantity === 1}
        className="p-2 border border-stone-200 rounded-full cursor-pointer"
      >
        <Minus size={16} />
      </button>
      <div>{item.quantity}</div>
      <button
        onClick={() => {
          dispatch({
            type: "increment",
            id: item.id,
          });
          addProductToCart(item.Product.id);
        }}
        className="p-2 border border-stone-200 rounded-full cursor-pointer"
      >
        <Plus size={16} />
      </button>
      <button
        onClick={() => {
          dispatch({ type: "delete-item", id: item.id });
          removeProductFromCart(item.Product.id);
        }}
        className="text-red-500 cursor-pointer"
      >
        <Trash2 />
      </button>
    </div>
  );
}
