import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    // Extrai query params da requisição
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || "1";
    const limit = url.searchParams.get("limit") || "10";

    // Faz requisição para o backend real passando token e params
    const response = await axios.get(
      `${process.env.BACKEND_BASE_URL}/api/v1/verifications`,
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
        params: { page, limit },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar verificações:", error);
    return NextResponse.json(
      { error: "Erro ao buscar verificações" },
      { status: 500 }
    );
  }
}
