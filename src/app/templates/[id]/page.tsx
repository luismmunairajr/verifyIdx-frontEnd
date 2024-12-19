'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from '@/components/automation-studio/nodes/CustomNode';
import "@/components/automation-studio/nodes/index.css";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Workflow = {
  id: number; // Identificador interno para facilitar a cópia, mas não na rota
  name: string;
  description?: string;
  nodes: any[];
  edges: any[];
};

export default function WorkflowPage() {
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Obter o workflow atual do localStorage (pode ser o último selecionado)
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    const currentWorkflow = savedWorkflows[savedWorkflows.length - 1]; // Simulação do último workflow acessado

    if (!currentWorkflow) {
      alert('No workflow available.');
      router.push('/templates'); // Redirecionar para templates se não houver workflow
    } else {
      setWorkflow(currentWorkflow);
    }
  }, [router]);

  const handleCopyWorkflow = () => {
    if (workflow) {
      const newWorkflow = {
        ...workflow,
        id: Date.now(), // Gerar um novo ID único para controle interno
        name: `${workflow.name} (Copy)`,
      };

      // Salvar o novo workflow no localStorage
      const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
      localStorage.setItem('workflows', JSON.stringify([...savedWorkflows, newWorkflow]));

      // Redirecionar para o editor (rota fixa "/workflow")
      localStorage.setItem('currentWorkflow', JSON.stringify(newWorkflow));
      router.push('/workflow');
    }
  };

  if (!workflow) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center gap-2 w-full" style={{ height: "85vh" }}>
      <div className='border-2 h-full rounded-xl shadow-xl p-4 flex flex-col gap-4'>
        <h1 className="text-xl font-bold mb-4">{workflow.name}</h1>
        {workflow.description && <p className="text-gray-600">{workflow.description}</p>}
        <div>
          <h1>CATEGORIES</h1>
          <div className='flex gap-2'>
            <Badge>My Template</Badge>
            <Badge>Artificial Intelligence</Badge>
          </div>
        </div>
        <Button>Use Workflow</Button>
        <Button variant={"secondary"} onClick={handleCopyWorkflow}>Copy Workflow</Button>
      </div>
      <div className="h-full overflow-hidden w-2/3 bg-zinc-100 dark:bg-zinc-950 border-2 border-blue-900 rounded-xl">
        <ReactFlow
          nodes={workflow.nodes}
          edges={workflow.edges}
          fitView
          nodeTypes={{ custom: CustomNode }}
          style={{ width: '100%', height: '100%' }}>
          <Background />
          <Controls className='controls' />
          <MiniMap className='minimap' />
        </ReactFlow>
      </div>
    </div>
  );
}
