import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      avatarUrl?: string;
      createAt: string;
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
    token?: string;
    avatarUrl?: string;
    createAt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    avatarUrl?: string;
    createAt: string;
    accessToken?: string;
  }
}
