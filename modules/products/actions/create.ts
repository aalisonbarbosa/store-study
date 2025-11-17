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

  revalidateTag("products-peding");
  revalidateTag("products-user");
}