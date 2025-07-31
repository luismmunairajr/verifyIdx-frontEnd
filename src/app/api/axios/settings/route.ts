import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  tenantId?: string;
  email?: string;
}

async function getAccessTokenTenantIdAndEmail(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.accessToken) {
    return { error: "Não autenticado ou token não encontrado", status: 401 };
  }

  let decoded: DecodedToken;
  try {
    decoded = jwtDecode(token.accessToken as string);
  } catch {
    return { error: "Token inválido", status: 401 };
  }

  if (!decoded.tenantId || !decoded.email) {
    return { error: "tenantId ou email não encontrado no token", status: 401 };
  }

  return { accessToken: token.accessToken, tenantId: decoded.tenantId, email: decoded.email };
}

export async function GET(req: NextRequest) {
  const data = await getAccessTokenTenantIdAndEmail(req);
  if ("error" in data) {
    return NextResponse.json({ error: data.error }, { status: data.status });
  }

  const { accessToken, tenantId, email } = data;

  try {
    const response = await axios.get(`${process.env.MIDLEWARE_BASE_URL}/tenant/user?email=${email}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
     
    });

    return NextResponse.json(response.data.users || []);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
  }
}
