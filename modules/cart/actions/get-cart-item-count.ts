"use server";

import { getSession } from "@/lib/get-session";

export async function getCartItemCount(): Promise<number | null> {
  try {
    const session = await getSession();

    if (!session?.user.accessToken) return null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/count`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
      next: { tags: ["products-cart"] },
    });

    if (!res.ok) {
      console.error("API /cart/count retornou erro:", res.status);
      return null;
    }

    const cartItemCount: number = await res.json();

    return cartItemCount;
  } catch (err) {
    console.error(err);
    return null;
  }
}
