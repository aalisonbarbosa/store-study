import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSession(): Promise<Session> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Sessão inexistente: usuário não autenticado.");
  }

  return session;
}