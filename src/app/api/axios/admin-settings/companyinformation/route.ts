// src/app/api/company-info/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  tenantId?: string;
}

export async function GET() {
  // Pega sessão e token server side
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Não autenticado ou token não encontrado" }, { status: 401 });
  }

  // Decodifica token para pegar tenantId
  let decoded: DecodedToken;
  try {
    decoded = jwtDecode(session.accessToken as string);
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  if (!decoded.tenantId) {
    return NextResponse.json({ error: "tenantId não encontrado no token" }, { status: 401 });
  }

  const tenantId = decoded.tenantId;

  try {
    // Faz chamada para o middleware, usando tenantId no caminho ou query params
    const response = await axios.get(`${process.env.MIDLEWARE_BASE_URL}/tenants/${tenantId}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    // Retorna os dados do middleware para o frontend
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar dados da empresa no middleware:", error);
    return NextResponse.json({ error: "Erro ao buscar dados da empresa" }, { status: 500 });
  }
}
