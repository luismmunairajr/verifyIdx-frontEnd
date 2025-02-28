import dbConnect from '@/lib/db';
import Workflow from '@/models/Workflow';

export async function GET(request, { params }) {
  await dbConnect();

  try {
    const { id } = params;

    // Verifica se o ID foi fornecido
    if (!id) {
      return Response.json({ message: "Workflow ID is required" }, { status: 400 });
    }

    // Busca o workflow pelo ID
    const workflow = await Workflow.findById(id);

    // Verifica se o workflow foi encontrado
    if (!workflow) {
      return Response.json({ message: "Workflow not found" }, { status: 404 });
    }

    return Response.json(workflow);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}