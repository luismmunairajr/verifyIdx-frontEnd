import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    roles?: string[];
  }
}

declare module "next-auth/jwt" {
    interface JWT {
      accessToken?: string;
      refreshToken?: string;
      idToken?: string;
      expiresAt?: number;
      roles?: string[];
    }
  }