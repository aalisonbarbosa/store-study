"use server";

import { getSession } from "@/lib/auth";
import { revalidateTag } from "next/cache";

export async function approveProduct(id: string) {
  const session = await getSession();

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/approve`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  revalidateTag("products-approved");
  revalidateTag("products-pending");
  revalidateTag("products-user");
}
