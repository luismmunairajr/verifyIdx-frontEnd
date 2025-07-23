// src/app/api/company-info/route.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const secret = process.env.NEXTAUTH_SECRET!;

interface DecodedToken {
  tenantId?: string;
}

import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token || !token.accessToken) {
    return NextResponse.json({ error: "Não autenticado ou token ausente" }, { status: 401 });
  }

  // Decodifica accessToken no servidor
  let decoded: DecodedToken;
  try {
    decoded = jwtDecode(token.accessToken as string);
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  if (!decoded.tenantId) {
    return NextResponse.json({ error: "tenantId não encontrado no token" }, { status: 401 });
  }

  const tenantId = decoded.tenantId;

  try {
    const response = await axios.get(`${process.env.MIDLEWARE_BASE_URL}/tenants/${tenantId}`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar dados da empresa no middleware:", error);
    return NextResponse.json({ error: "Erro ao buscar dados da empresa" }, { status: 500 });
  }
}
