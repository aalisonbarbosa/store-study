"use server";

import { getSession } from "@/lib/get-session";
import { revalidateTag } from "next/cache";

export async function rejectProduct(id: string, reason: string) {
  try {
    const session = await getSession();

    if (!session?.user.accessToken) return;

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
  } catch (err) {
    console.error(err);
  }
}
