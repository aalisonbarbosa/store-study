"use server";

import { revalidateTag } from "next/cache";
import axios from "axios";

export async function createProduct(formData: FormData, token: string) {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  revalidateTag("products");
}

export async function getProductsByUser(userId: string, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/products`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
      next: { tags: ["products"] },
    }
  );

  if (!res.ok) {
    console.error("Erro ao buscar produtos:", res.status, res.statusText);
    return [];
  }

  const products = await res.json();

  return products;
}
