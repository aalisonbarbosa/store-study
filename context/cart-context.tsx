"use client";

import { CartBase, CartItem } from "@/modules/cart";
import { ProductCard } from "@/modules/products";
import { createContext, ReactNode, useContext, useReducer } from "react";

interface CartProviderProps {
  children: ReactNode;
  initialCart: CartBase | null;
}

type CartAction =
  | { type: "delete-item"; id: string }
  | { type: "increment"; id: string }
  | { type: "decrement"; id: string }
  | { type: "add-item"; item: ProductCard };

export const CartContext = createContext<CartBase | null>(null);
export const CartDispatchContext = createContext<React.Dispatch<CartAction>>(
  () => {}
);

export function CartProvider({ children, initialCart }: CartProviderProps) {
  const [cart, dispach] = useReducer(CartReducer, initialCart);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispach}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}

function CartReducer(cart: CartBase | null, action: CartAction): CartBase | null {
  switch (action.type) {
    case "delete-item":
      if (!cart) return null;
      return {
        ...cart,
        CartItem: cart.CartItem.filter((i) => i.id !== action.id),
      };

    case "increment":
      if (!cart) return null;
      return {
        ...cart,
        CartItem: cart.CartItem.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };

    case "decrement":
      if (!cart) return null;
      return {
        ...cart,
        CartItem: cart.CartItem.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };

    case "add-item":
      if (!cart) return null;

      const existingItem = cart.CartItem.find(
        (i) => i.productId === action.item.id
      );

      if (existingItem) {
        return {
          ...cart,
          CartItem: cart.CartItem.map((i) =>
            i.productId === action.item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      } else {
        const newItem: CartItem = {
          id: crypto.randomUUID(),
          cartId: cart.id,
          productId: action.item.id,
          Product: action.item,
          quantity: 1,
        };

        return {
          ...cart,
          CartItem: [...cart.CartItem, newItem],
        };
      }

    default:
      return cart;
  }
}
