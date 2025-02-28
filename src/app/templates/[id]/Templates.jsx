'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from '@/components/automation-studio/nodes/CustomNode';
import "@/components/automation-studio/nodes/index.css";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TemplatePage({ params }) {
  const { id } = params;
  const [workflow, setWorkflow] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        const response = await fetch(`/api/workflows/${id}`);
        if (!response.ok) {
          throw new Error('Workflow not found');
        }
        const data = await response.json();
        setWorkflow(data);
      } catch (error) {
        alert('Workflow not found.');
        router.push('/templates');
      }
    };

    fetchWorkflow();
  }, [id, router]);

  if (!workflow) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center gap-2 w-full" style={{ height: "85vh" }}>
      <div className='border-2 h-full w-1/4 rounded-xl shadow-xl p-4 flex flex-col gap-4'>
        <h1 className="text-xl font-bold mb-4">{workflow.name}</h1>
        {workflow.description && <p className="text-gray-600 text-xs">{workflow.description}</p>}
        
        <div>
          <h1>CATEGORIES</h1>
          <div className='flex gap-2 flex-wrap'>
            {workflow.categories && workflow.categories.length > 0 ? (
              workflow.categories.map((category, index) => (
                <Badge key={index} variant={"outline"}>{category}</Badge>
              ))
            ) : (
              <p className="text-gray-500 text-xs">No categories assigned</p>
            )}
          </div>
        </div>

        <Button>Use Workflow</Button>
        <Button
          variant="secondary"
          onClick={() => router.push(`/automation-studio?workflowId=${workflow.id}`)}>
          Copy Workflow
        </Button>
      </div>

      <div className="h-full overflow-hidden w-2/3 bg-zinc-100 dark:bg-zinc-950 border-2 rounded-xl">
        <ReactFlow
          nodes={workflow.nodes}
          edges={workflow.edges}
          fitView
          nodeTypes={{ custom: CustomNode }}
          style={{ width: '100%', height: '100%' }}
        >
          <Background />
          <Controls className='controls' />
          <MiniMap className='minimap' />
        </ReactFlow>
      </div>
    </div>
  );
}
