"use server";

import { getSession } from "@/lib/auth";
import { revalidateTag } from "next/cache";

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

  revalidateTag("products-peding");
  revalidateTag("products-user");
}
