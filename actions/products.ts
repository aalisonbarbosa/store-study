"use server";

import { revalidateTag } from "next/cache";
import { getSession } from "@/lib/auth";

export async function createProduct(formData: FormData) {
  const session = await getSession();

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    body: formData,
  });

  revalidateTag("products");
}

export async function getApprovedProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: "force-cache",
    next: { tags: ["products"] },
  });

  if (!res.ok) return [];

  const products = await res.json();

  return products;
}

export async function getProductsByUser() {
  const session = await getSession();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${session.user.id}/products`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
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

export async function getPendingProduct() {
  const session = await getSession();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/request`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
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

export async function approveProduct(id: string) {
  const session = await getSession();

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/approve`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  revalidateTag("products");
}

export async function rejectProduct(id: string, reason: string) {
  const session = await getSession();

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/reject`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reason }),
  });

  revalidateTag("products");
}
