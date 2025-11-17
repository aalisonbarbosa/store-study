"use server";

import { getSession } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

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
    redirect("/login");
  }
}
