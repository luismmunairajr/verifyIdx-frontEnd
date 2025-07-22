
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const response = await axios.post(
      `${process.env.BACKEND_BASE_URL}/api/v1/workflows`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar templates:", error);
    return NextResponse.json(
      { error: "Erro ao buscar templates" },
      { status: 500 }
    );
  }
}
