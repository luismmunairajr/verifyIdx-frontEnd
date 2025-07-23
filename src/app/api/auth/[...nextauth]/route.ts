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
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
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
      }
      return token;
    },

    async session({ session, token }) {
      // Retorna dados seguros para o frontend, sem expor accessToken
      return {
        ...session,
        user: {
          ...session.user,
          roles: token.roles ?? [],
          clientId: token.clientId,
          // NÃO incluir accessToken aqui!
        },
        expires: session.expires,
      };
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
