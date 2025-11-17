"use server";

import { getSession } from "@/lib/auth";
import { ProductBase } from "../types/product-base";

export async function getProductsBySeller(): Promise<ProductBase[]> {
  try {
    const session = await getSession();

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
      return [];
    }

    const products = await res.json();

    return products;
  } catch (err) {
    console.error(err);
    return [];
  }
}