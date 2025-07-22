import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

export async function GET(
  req: NextRequest,
  { params }: { params: { verificationId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const { verificationId } = params;

    const response = await axios.get(
      `${process.env.BACKEND_BASE_URL}/api/v1/verifications/${verificationId}`,
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(`Erro ao buscar detalhes da verificação ${params.verificationId}:`, error);
    return NextResponse.json(
      { error: "Erro ao buscar detalhes da verificação" },
      { status: 500 }
    );
  }
}
