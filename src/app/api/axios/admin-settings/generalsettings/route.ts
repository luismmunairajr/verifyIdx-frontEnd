import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  tenantId?: string;
}

async function getAccessTokenAndTenantId(req: NextRequest) {
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

  if (!decoded.tenantId) {
    return { error: "tenantId não encontrado no token", status: 401 };
  }

  return { accessToken: token.accessToken, tenantId: decoded.tenantId };
}

export async function GET(req: NextRequest) {
  const data = await getAccessTokenAndTenantId(req);
  if ("error" in data) {
    return NextResponse.json({ error: data.error }, { status: data.status });
  }
  const { accessToken, tenantId } = data;

  try {
    const response = await axios.get(`${process.env.MIDLEWARE_BASE_URL}/tenant/users`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { tenantId },
    });
    return NextResponse.json(response.data.users || []);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await getAccessTokenAndTenantId(req);
  if ("error" in data) {
    return NextResponse.json({ error: data.error }, { status: data.status });
  }
  const { accessToken, tenantId } = data;

  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email é obrigatório" }, { status: 400 });
  }

  const body = await req.json();

  try {
    const response = await axios.put(
      `${process.env.MIDLEWARE_BASE_URL}/tenant/users?email=${email}`,
      { ...body, tenantId },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const data = await getAccessTokenAndTenantId(req);
  if ("error" in data) {
    return NextResponse.json({ error: data.error }, { status: data.status });
  }
  const { accessToken, tenantId } = data;

  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email é obrigatório" }, { status: 400 });
  }

  try {
    const response = await axios.delete(
      `${process.env.MIDLEWARE_BASE_URL}/tenant/users?email=${email}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { tenantId }, // caso middleware exija tenantId no body da requisição DELETE
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return NextResponse.json({ error: "Erro ao deletar usuário" }, { status: 500 });
  }
}
