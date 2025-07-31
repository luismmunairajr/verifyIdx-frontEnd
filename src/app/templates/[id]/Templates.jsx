'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from '@/app/api/axios/axiosInstance';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import CustomNode from '@/components/automation-studio/nodes/customNode';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TemplatePageSkeleton from './TemplatePageSkeleton';
import { useLanguage } from '@/components/language/language-provider';

export default function TemplatePage({ params }) {
  const { t } = useLanguage();
  const { id } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams?.get('source') || 'mongo';

  const [workflow, setWorkflow] = useState(null);

  // Função para normalizar workflow de diferentes fontes para o mesmo formato
  function normalizeWorkflow(data, source) {
    if (source === 'backend') {
      // Exemplo backend: { workflowId, workflowName, ... }
      return {
        id: data.workflowId,
        name: data.workflowName,
        description: data.description || '',  // Pode não existir no backend
        categories: data.categories || [],    // Pode não existir no backend
        nodes: data.nodes || [],               // Ajuste conforme a estrutura real do backend
        edges: data.edges || [],
        tags: data.tags || [],
      };
    } else {
      // Mongo assume que já está no formato esperado, ou ajustar conforme necessário
      return {
        id: data._id || data.id || '',        // Mongo geralmente usa _id
        name: data.name || '',
        description: data.description || '',
        categories: data.categories || [],
        nodes: data.nodes || [],
        edges: data.edges || [],
        tags: data.tags || [],
      };
    }
  }

  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        let data;
        if (source === 'backend') {
          const response = await axiosInstance.get(`/api/axios/templates/${id}`);
          data = response.data;
        } else {
          const response = await fetch(`/api/workflows/${id}`);
          if (!response.ok) throw new Error('Workflow not found');
          data = await response.json();
        }

        const normalized = normalizeWorkflow(data, source);
        setWorkflow(normalized);
      } catch (error) {
        alert(t('template.notFound'));
        router.push('/templates');
      }
    };
    fetchWorkflow();
  }, [id, source, router, t]);

  if (!workflow) {
    return <TemplatePageSkeleton />;
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
          onClick={() => router.push(`/automation-studio/${id}`)}>
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
