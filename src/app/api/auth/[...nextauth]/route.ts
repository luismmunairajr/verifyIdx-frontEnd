import { AuthOptions, TokenSet } from "next-auth";
import NextAuth from "next-auth";
<<<<<<< HEAD
import KeycloakProvider from "next-auth/providers/keycloak";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  tenantId?: string;
  azp?: string; // authorized party (clientId)
=======
import KeycloakProvider from "next-auth/providers/keycloak"
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";


interface DecodedToken {
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
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
<<<<<<< HEAD
    cache: "no-store",
=======
    cache: "no-store"
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
  });
}

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
<<<<<<< HEAD
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  session: {
    maxAge: 60 * 30, // 30 minutos
=======
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER
    })
  ],
  session: {
    maxAge: 60 * 30
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
<<<<<<< HEAD
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;

        // Decodificar o token
        const decoded: DecodedToken = jwtDecode(account.access_token as string);

        token.roles = decoded.resource_access?.[process.env.KEYCLOAK_CLIENT_ID!]?.roles ?? [];
        token.tenantId = decoded.tenantId;
        token.clientId = decoded.azp;

        // LOG para debug
        console.log("[JWT Callback - First Login] accessToken:", token.accessToken);
        console.log("[JWT Callback - First Login] tenantId:", token.tenantId);
        console.log("[JWT Callback - First Login] clientId:", token.clientId);
        console.log("[JWT Callback - First Login] roles:", token.roles);

        return token;
      }

      // Token ainda é válido
      if (typeof token.expiresAt === "number" && Date.now() < (token.expiresAt * 1000 - 60 * 1000)) {
        return token;
      }

      // Refresh token
      try {
        const response = await requestRefreshOfAccessToken(token);
        const tokens: TokenSet = await response.json();

        if (!response.ok) throw tokens;

        const decoded: DecodedToken = jwtDecode(tokens.access_token as string);

        return {
          ...token,
          idToken: tokens.id_token,
          accessToken: tokens.access_token,
          expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
          refreshToken: tokens.refresh_token ?? token.refreshToken,
          roles: decoded.resource_access?.[process.env.KEYCLOAK_CLIENT_ID!]?.roles ?? [],
          tenantId: decoded.tenantId,
          clientId: decoded.azp,
        };
      } catch (error) {
        console.error("Error refreshing access token", error);
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
=======
        token.idToken = account.id_token
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at

        console.log(token.accessToken);

        const decoded: DecodedToken = jwtDecode(account.access_token as string);

        token.roles = decoded.resource_access?.[process.env.KEYCLOAK_CLIENT_ID]?.roles ?? []

        return token
      }
      // we take a buffer of one minute(60 * 1000 ms)
      if (typeof token.expiresAt === "number" && Date.now() < (token.expiresAt * 1000 - 60 * 1000)) {
        return token
      } else {
        try {
          const response = await requestRefreshOfAccessToken(token)

          const tokens: TokenSet = await response.json()

          if (!response.ok) throw tokens

          const updatedToken: JWT = {
            ...token, // Keep the previous token properties
            idToken: tokens.id_token,
            accessToken: tokens.access_token,
            expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
            refreshToken: tokens.refresh_token ?? token.refreshToken,
          }
          
          const decoded: DecodedToken = jwtDecode(tokens.access_token as string);
        updatedToken.roles = decoded?.resource_access?.[process.env.KEYCLOAK_CLIENT_ID]?.roles ?? [];

          return updatedToken
        } catch (error) {
          console.error("Error refreshing access token", error)
          return { ...token, error: "RefreshAccessTokenError" }
        }
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken ?? undefined,
        roles: token.roles ?? []
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
      };
    },
  },
  pages: {
<<<<<<< HEAD
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
=======
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
