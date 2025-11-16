"use client";

import {
  addProductToCart,
  decrementProductInCart,
  removeProductFromCart,
} from "@/actions/cart";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useState } from "react";

interface ICartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  Product: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
  };
}

export default function CartItemQuantity({ item }: { item: ICartItem }) {
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => {
          setQuantity((prev) => --prev);
          decrementProductInCart(item.Product.id);
        }}
        disabled={quantity === 1}
        className="p-2 border border-stone-200 rounded-full cursor-pointer"
      >
        <Minus size={16} />
      </button>
      <div>{quantity}</div>
      <button
        onClick={() => {
          setQuantity((prev) => ++prev);
          addProductToCart(item.Product.id);
        }}
        className="p-2 border border-stone-200 rounded-full cursor-pointer"
      >
        <Plus size={16} />
      </button>
      <button
        onClick={() => removeProductFromCart(item.Product.id)}
        className="text-red-500 cursor-pointer"
      >
        <Trash2 />
      </button>
    </div>
  );
}
