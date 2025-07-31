import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const accessToken = session?.accessToken as string;

  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Token de acesso ausente" }), { status: 401 });
  }

  try {
    const kcResponse = await fetch(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      method: "GET",
    });

    if (!kcResponse.ok) {
      const errorData = await kcResponse.text();
      return new Response(JSON.stringify({ error: errorData }), { status: kcResponse.status });
    }

    const users = await kcResponse.json();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao buscar usuários", details: error }), { status: 500 });
  }
}
