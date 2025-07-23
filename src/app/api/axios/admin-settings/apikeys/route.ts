import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  tenantId?: string;
}

async function getSessionAndTenantId() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return { error: "Não autenticado ou token não encontrado", status: 401 };
  }

  let decoded: DecodedToken;
  try {
    decoded = jwtDecode(session.accessToken as string);
  } catch {
    return { error: "Token inválido", status: 401 };
  }

  if (!decoded.tenantId) {
    return { error: "tenantId não encontrado no token", status: 401 };
  }

  return { session, tenantId: decoded.tenantId };
}

export async function GET(req: Request) {
  const sessionData = await getSessionAndTenantId();
  if ("error" in sessionData) {
    return NextResponse.json({ error: sessionData.error }, { status: sessionData.status });
  }
  const { session, tenantId } = sessionData;

  try {
    // Chamada para middleware buscando apikeys do tenant
    const response = await axios.get(
      `${process.env.MIDLEWARE_BASE_URL}/tenants/${tenantId}/apikeys`,
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar API Keys:", error);
    return NextResponse.json({ error: "Erro ao buscar API Keys" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  const sessionData = await getSessionAndTenantId();
  if ("error" in sessionData) {
    return NextResponse.json({ error: sessionData.error }, { status: sessionData.status });
  }
  const { session, tenantId } = sessionData;

  try {
    const response = await axios.post(
      `${process.env.MIDLEWARE_BASE_URL}/tenants/${tenantId}/apikeys`,
      {}, // corpo vazio, você pode adicionar dados aqui se necessário
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao criar API Key:", error);
    return NextResponse.json({ error: "Erro ao criar API Key" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const sessionData = await getSessionAndTenantId();
  if ("error" in sessionData) {
    return NextResponse.json({ error: sessionData.error }, { status: sessionData.status });
  }
  const { session, tenantId } = sessionData;

  const url = new URL(req.url);
  const apikeyId = url.searchParams.get("apikeyId");
  if (!apikeyId) {
    return NextResponse.json({ error: "apikeyId é obrigatório" }, { status: 400 });
  }

  try {
    // Chamada para middleware para revogar a chave
    await axios.delete(
      `${process.env.MIDLEWARE_BASE_URL}/tenants/${tenantId}/apikeys/${apikeyId}/revoke`,
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao revogar API Key:", error);
    return NextResponse.json({ error: "Erro ao revogar API Key" }, { status: 500 });
  }
}
