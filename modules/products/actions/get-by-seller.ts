"use server";

import { getSession } from "@/lib/get-session";
import { ProductBase } from "../types/product-base";

export async function getProductsBySeller(): Promise<ProductBase[] | null> {
  try {
    const session = await getSession();

    if (!session?.user.accessToken) return null;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${session.user.id}/products`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        cache: "force-cache",
        next: { tags: ["products-user"] },
      }
    );

    if (!res.ok) {
      console.error("API /user/:id/products retornou erro:", res.status);
      return null;
    }

    const products = await res.json();

    return products;
  } catch (err) {
    console.error(err);
    return null;
  }
}
