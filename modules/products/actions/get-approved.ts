"use server";

import { ProductBase } from "../types/product-base";

export async function getApprovedProducts(): Promise<ProductBase[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API /products retornou erro:", res.status);
      return [];
    }

    const products = await res.json();

    return products;
  } catch (err) {
    console.error(err);
    return [];
  }
}
