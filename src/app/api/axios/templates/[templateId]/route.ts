import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

interface Params {
  templateId: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Params }
) {
  const token = await getToken({ req });

  if (!token?.accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { templateId } = params;

  try {
    const response = await axios.get(
      `${process.env.BACKEND_BASE_URL}/api/v1/workflows/${templateId}`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Erro ao buscar template:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Erro ao buscar template" },
      { status: error?.response?.status || 500 }
    );
  }
}
