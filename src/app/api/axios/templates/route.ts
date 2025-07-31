import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const response = await axios.get(
      `${process.env.BACKEND_BASE_URL}/api/v1/workflows`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Erro ao buscar templates:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Erro ao buscar templates" },
      { status: error?.response?.status || 500 }
    );
  }
}
