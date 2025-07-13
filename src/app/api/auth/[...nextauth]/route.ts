import { AuthOptions, TokenSet } from "next-auth";
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { JWT } from "next-auth/jwt";
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

function requestRefreshOfAccessToken(token: JWT) {
  return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: typeof token.refreshToken === "string" ? token.refreshToken : "",
    }),
    method: "POST",
    cache: "no-store",
  });
}

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  session: {
    maxAge: 60 * 30, // 30 minutos
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;

        const decoded: DecodedToken = jwtDecode(account.access_token as string);

        const clientId = process.env.KEYCLOAK_CLIENT_ID!;
        const allResources = decoded.resource_access ?? {};
        const allRoles =
          allResources[clientId]?.roles ||
          allResources["nextjs"]?.roles || // fallback
          [];

        token.roles = allRoles.map((role) => role.toUpperCase()); // normaliza
        token.tenantId = decoded.tenantId;
        token.clientId = decoded.azp;
     


        return token;
      }

      // Verifica se token ainda é válido
      if (typeof token.expiresAt === "number" && Date.now() < token.expiresAt * 1000 - 60 * 1000) {
        return token;
      }

      // Refresh token
      try {
        const response = await requestRefreshOfAccessToken(token);
        const tokens: TokenSet = await response.json();

        if (!response.ok) throw tokens;

        const decoded: DecodedToken = jwtDecode(tokens.access_token as string);

        const clientId = process.env.KEYCLOAK_CLIENT_ID!;
        const allResources = decoded.resource_access ?? {};
        const allRoles =
          allResources[clientId]?.roles ||
          allResources["nextjs"]?.roles || [];

        return {
          ...token,
          idToken: tokens.id_token,
          accessToken: tokens.access_token,
          expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
          refreshToken: tokens.refresh_token ?? token.refreshToken,
          roles: allRoles.map((role) => role.toUpperCase()),
          tenantId: decoded.tenantId,
          clientId: decoded.azp,
        };
      } catch (error) {
        console.error("Erro ao renovar o token de acesso:", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },

    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        roles: token.roles ?? [],
        user: {
          ...session.user,
          tenantId: token.tenantId,
          clientId: token.clientId,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
