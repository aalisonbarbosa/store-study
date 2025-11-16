"use server";

import { getSession } from "@/lib/auth";
import { revalidateTag } from "next/cache";

interface ICart {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  CartItem: {
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
  }[];
}

export async function getCart(): Promise<ICart> {
  const session = await getSession();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    cache: "force-cache",
    next: { tags: ["products-cart"] },
  });

  const cart: ICart = await res.json();

  return cart;
}

export async function addProductToCart(productId: string) {
  try {
    const session = await getSession();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({ productId }),
    });

    revalidateTag("products-cart");
  } catch (err) {
    console.error(err);
  }
}

export async function decrementProductInCart(productId: string) {
  try {
    const session = await getSession();

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/items/${productId}/decrement`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );

    revalidateTag("products-cart");
  } catch (err) {
    console.error(err);
  }
}

export async function removeProductFromCart(productId: string) {
  try {
    const session = await getSession();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/items/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    revalidateTag("products-cart");
  } catch (err) {
    console.error(err);
  }
}

export async function getCartItemCount() {
  try {
    const session = await getSession();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/count`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "force-cache",
      next: { tags: ["products-cart"] },
    });

    const cartItemCount = await res.json();

    return cartItemCount;
  } catch (err) {
    console.error(err);
  }
}
