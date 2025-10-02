import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

import axios from "axios";

interface DecodedToken {
  tenantId?: string;
}

async function getAccessAndTenantId(req: NextRequest) {
 
  const token = await getToken({ req});

  if (!token || !token.accessToken) {
    return { error: "Não autenticado ou token não encontrado", status: 401 };
  }

  let decoded: DecodedToken;
  try {
    decoded = jwtDecode(token.accessToken as string);
  } catch {
    return { error: "Token inválido", status: 401 };
  }

  if (!decoded.tenantId) {
    return { error: "tenantId não encontrado no token", status: 401 };
  }

  return { accessToken: token.accessToken, tenantId: decoded.tenantId };
}

// === GET ===
export async function GET(req: NextRequest) {
  const tokenData = await getAccessAndTenantId(req);
  if ("error" in tokenData) {
    return NextResponse.json({ error: tokenData.error }, { status: tokenData.status });
  }

  const { accessToken, tenantId } = tokenData;

  try {
    const response = await axios.get(
      `${process.env.MIDLEWARE_BASE_URL}/tenants/${tenantId}/apikeys`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar API Keys:", error);
    return NextResponse.json({ error: "Erro ao buscar API Keys" }, { status: 500 });
  }
}
// === POST ===
export async function POST(req: NextRequest) {
  const tokenData = await getAccessAndTenantId(req);
  if ("error" in tokenData) {
    return NextResponse.json({ error: tokenData.error }, { status: tokenData.status });
  }

  const { accessToken, tenantId } = tokenData;

  try {
    // Extrair o body JSON da requisição
    const body = await req.json();

    // Validar campo 'name'
    if (!body.name || typeof body.name !== "string" || body.name.trim() === "") {
      return NextResponse.json(
        { error: "Missing or invalid 'name' in request body" },
        { status: 400 }
      );
    }

    // Enviar para o middleware, incluindo o 'name'
    const response = await axios.post(
      `${process.env.MIDLEWARE_BASE_URL}/tenants/${tenantId}/apikeys`,
      { name: body.name.trim() },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao criar API Key:", error);
    return NextResponse.json({ error: "Erro ao criar API Key" }, { status: 500 });
  }
}
// === DELETE ===
export async function DELETE(req: NextRequest) {
  const tokenData = await getAccessAndTenantId(req);
  if ("error" in tokenData) {
    return NextResponse.json({ error: tokenData.error }, { status: tokenData.status });
  }

  const { accessToken, tenantId } = tokenData;

  const url = new URL(req.url);
  const apiKeyId = url.searchParams.get("apiKeyId");

  if (!apiKeyId) {
    return NextResponse.json({ error: "apiKeyId é obrigatório" }, { status: 400 });
  }

  try {
    await axios.delete(
      `${process.env.MIDLEWARE_BASE_URL}/tenants/${tenantId}/apikeys/${apiKeyId}/revoke`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao revogar API Key:", error);
    return NextResponse.json({ error: "Erro ao revogar API Key" }, { status: 500 });
  }
}
