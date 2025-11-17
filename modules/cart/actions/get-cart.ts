"use server";

import { getSession } from "@/lib/auth";
import { CartBase } from "../types/cart-base";

export async function getCart(): Promise<CartBase | null> {
  try {
    const session = await getSession();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
      next: { tags: ["products-cart"] },
    });

    const cart: CartBase = await res.json();

    return cart;
  } catch (err) {
    console.error(err);
    return null;
  }
}
