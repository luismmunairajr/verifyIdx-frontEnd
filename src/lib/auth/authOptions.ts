import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  tenantId?: string;
  azp?: string;
  resource_access?: {
    [client: string]: {
      roles: string[];
    };
  };
}

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
      authorization: {
        params: {
          prompt: "login", // força tela de login
        },
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      const now = Math.floor(Date.now() / 1000);

      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.expiresAt = account.expires_at;

        const decoded: DecodedToken = jwtDecode(account.access_token as string);
        const clientId = process.env.KEYCLOAK_CLIENT_ID!;
        const allResources = decoded.resource_access ?? {};
        const roles = allResources[clientId]?.roles || [];

        token.roles = roles.map((r) => r.toUpperCase());
        token.tenantId = decoded.tenantId;
        token.clientId = decoded.azp;

        return token;
      }

      if (token.expiresAt && token.expiresAt > now) {
        return token;
      }

      // Token expirado - tenta renovar
      try {
        const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: process.env.KEYCLOAK_CLIENT_ID!,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken as string,
          }),
        });

        if (!response.ok) throw new Error("Falha ao renovar token");

        const refreshed = await response.json();

        const decoded: DecodedToken = jwtDecode(refreshed.access_token);
        const clientId = process.env.KEYCLOAK_CLIENT_ID!;
        const allResources = decoded.resource_access ?? {};
        const roles = allResources[clientId]?.roles || [];

        return {
          ...token,
          accessToken: refreshed.access_token,
          refreshToken: refreshed.refresh_token,
          idToken: refreshed.id_token,
          expiresAt: now + refreshed.expires_in,
          roles: roles.map((r) => r.toUpperCase()),
          tenantId: decoded.tenantId,
          clientId: decoded.azp,
        };
      } catch {
        return { ...token, error: "RefreshTokenError" };
      }
    },

    async session({ session, token }) {
      return {
        ...session,
        roles: token.roles ?? [],
        tenantId: token.tenantId,
        clientId: token.clientId,
        error: token.error,
      };
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60, 
  },
};

export default NextAuth(authOptions);
