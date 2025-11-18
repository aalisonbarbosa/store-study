"use server";

import { revalidateTag } from "next/cache";
import { getSession } from "@/lib/get-session";

export async function createProduct(formData: FormData) {
  try {
    const session = await getSession();

    if (!session?.user.accessToken) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: formData,
    });

    revalidateTag("products-peding");
    revalidateTag("products-user");
  } catch (err) {
    console.error(err);
  }
}
