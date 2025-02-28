import dbConnect from '@/lib/db';
import Workflow from '@/models/Workflow';

export async function GET() {
  await dbConnect();

  try {
    const workflows = await Workflow.find().sort({ createdAt: -1 });
    return Response.json(workflows);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const { name, description, nodes, edges, categories } = await request.json();

    const newWorkflow = new Workflow({
      name,
      description,
      nodes,
      edges,
      categories
    });

    const savedWorkflow = await newWorkflow.save();
    return Response.json(savedWorkflow, { status: 201 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}