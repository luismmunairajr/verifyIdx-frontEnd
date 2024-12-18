import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === "admin" &&
          credentials?.password === "1234"
        ) {
          return { id: "1", name: "Admin User", email: "admin@example.com" };
        }
        return null; // Retorna null para credenciais inválidas
      },
    }),
  ],
  session: {
    strategy: "jwt", // Usa JWT para sessões
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-key",
});

export { handler as GET, handler as POST };
