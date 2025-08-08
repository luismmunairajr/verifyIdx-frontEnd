import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const decoded = jwtDecode(token.accessToken);

  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || "1";
    const limit = url.searchParams.get("limit") || "10";

    const response = await axios.get(
      `${process.env.BACKEND_BASE_URL}/api/v1/verifications`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
        params: { page, limit },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Erro ao buscar verificações:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Erro ao buscar verificações" },
      { status: error?.response?.status || 500 }
    );
  }
}
