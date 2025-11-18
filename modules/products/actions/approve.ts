"use server";

import { getSession } from "@/lib/get-session";
import { revalidateTag } from "next/cache";

export async function approveProduct(id: string) {
  try {
    const session = await getSession();

    if (!session?.user.accessToken) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/approve`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    revalidateTag("products-pending");
    revalidateTag("products-user");
  } catch (err) {
    console.error(err);
  }
}
