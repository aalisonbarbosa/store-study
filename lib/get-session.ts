"use server";

import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSession(): Promise<Session | null> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return null;

    return session;
  } catch (err) {
    return null;
  }
}
