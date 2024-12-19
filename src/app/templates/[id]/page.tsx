'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from '@/components/automation-studio/nodes/CustomNode';

type Workflow = {
  id: number;
  name: string;
  description?: string;
  nodes: any[];
  edges: any[];
};

export default function WorkflowPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    const foundWorkflow = savedWorkflows.find((wf: Workflow) => wf.id === Number(id));

    if (!foundWorkflow) {
      alert('Workflow not found.');
      router.push('/templates');
    } else {
      setWorkflow(foundWorkflow);
    }
  }, [id, router]);

  if (!workflow) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{workflow.name}</h1>
      {workflow.description && <p className="text-gray-600">{workflow.description}</p>}
      <div className="h-[500px] border mt-4">
        <ReactFlow
          nodes={workflow.nodes}
          edges={workflow.edges}
          fitView
          nodeTypes={{ custom: CustomNode }}  // Garantir que a tipagem do nó customizado está correta
          style={{ width: '100%', height: '100%' }}>
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}
