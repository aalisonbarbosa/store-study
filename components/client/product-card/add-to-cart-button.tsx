"use client";

import { useCartDispatch } from "@/context/cart-context";
import { addProductToCart } from "@/modules/cart/actions/add-product";
import { ProductCard } from "@/modules/products";

export default function AddToCart({ product }: { product: ProductCard}) {
  const dispatch = useCartDispatch();

  return (
    <button
      onClick={() => {
        dispatch({ type: "add-item", item: product });
        addProductToCart(product.id);
      }}
      className="text-sm bg-blue-700 text-stone-50 p-2 rounded-md z-20 cursor-pointer"
    >
      Adicionar
    </button>
  );
}
