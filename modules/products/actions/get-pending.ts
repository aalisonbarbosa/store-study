"use server";

import { getSession } from "@/lib/get-session";
import { ProductBase } from "../types/product-base";

export async function getPendingProduct(): Promise<ProductBase[] | null> {
  try {
    const session = await getSession();

    if (!session?.user.accessToken) return null;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/request`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        cache: "no-store",
        next: { tags: ["products-peding"] },
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
