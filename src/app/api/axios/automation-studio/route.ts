import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface DecodedToken {
  tenantId?: string;
  clientId?: string;
}

async function getAccessAndTenantId(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.accessToken) {
    return { error: "Não autenticado ou token não encontrado", status: 401 };
  }

  let decoded: DecodedToken;
  try {
    decoded = jwtDecode(token.accessToken as string);
  } catch {
    return { error: "Token inválido", status: 402 };
  }

  if (!decoded.tenantId) {
    return { error: "tenantId e clientId não encontrado no token", status: 403 };
  }

  return {
    accessToken: token.accessToken,
    tenantId: decoded.tenantId,
    clientId: decoded.tenantId,
  };
}

export async function POST(req: NextRequest) {
  const tokenData = await getAccessAndTenantId(req);

  if ("error" in tokenData) {
    return NextResponse.json({ error: tokenData.error }, { status: tokenData.status });
  }

  const { accessToken, tenantId, clientId } = tokenData;
  const body = await req.json();
  const { workflowName, webhookUrl, requiredProducts, identityVerificationSteps, tags } = body;

  // Monta o payload final
  const payload = {
    workflowName,
    version: "1",
    tenantId,
    clientId,
    webhookUrl,
    requiredProducts,
    identityVerificationSteps: identityVerificationSteps || [],
    tags: tags || [],
  };

  try {
    const response = await axios.post(`${process.env.BACKEND_BASE_URL}/api/v1/workflows`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (e: any) {
    console.error("Erro ao publicar workflow:", e.response?.data || e.message);
    return NextResponse.json({ error: "Erro ao publicar workflow" }, { status: e.response?.status || 500 });
  }
}
