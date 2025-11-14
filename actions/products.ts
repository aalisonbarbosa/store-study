"use server";

import { revalidateTag } from "next/cache";
import axios from "axios";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getSession(): Promise<Session> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Sessão inexistente: usuário não autenticado.");
  }

  return session;
}

export async function createProduct(formData: FormData) {
  const session = await getSession();

  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  revalidateTag("products");
}

export async function getApprovedProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: "force-cache",
    next: { tags: ["products"] },
  });

  if (!res.ok) return [];

  const products = res.json();

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

export async function getPendingProduct(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/request`,
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

export async function approveProduct(id: string, token: string) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/approve`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  revalidateTag("products");
}

export async function rejectProduct(id: string, token: string, reason: string) {
  console.log("chamou rejectProduct", { id, token, reason });

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/reject`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reason }),
  });

  revalidateTag("products");
}
