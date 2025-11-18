"use server";

import { getSession } from "@/lib/get-session";
import { revalidateTag } from "next/cache";

export async function decrementProductInCart(productId: string) {
  try {
    const session = await getSession();

    if (!session?.user.accessToken) return;

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
