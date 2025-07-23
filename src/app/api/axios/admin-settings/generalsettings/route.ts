// app/api/tenant/users/route.ts
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
    const response = await axios.get(`${process.env.MIDLEWARE_BASE_URL}/tenant/users`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
      params: { tenantId },
    });
    return NextResponse.json(response.data.users || []);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const sessionData = await getSessionAndTenantId();
  if ("error" in sessionData) {
    return NextResponse.json({ error: sessionData.error }, { status: sessionData.status });
  }
  const { session, tenantId } = sessionData;

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
      { headers: { Authorization: `Bearer ${session.accessToken}` } }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const sessionData = await getSessionAndTenantId();
  if ("error" in sessionData) {
    return NextResponse.json({ error: sessionData.error }, { status: sessionData.status });
  }
  const { session, tenantId } = sessionData;

  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email é obrigatório" }, { status: 400 });
  }

  try {
    const response = await axios.delete(
      `${process.env.MIDLEWARE_BASE_URL}/tenant/users?email=${email}`,
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
        data: { tenantId }, // caso middleware exija no body
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return NextResponse.json({ error: "Erro ao deletar usuário" }, { status: 500 });
  }
}
