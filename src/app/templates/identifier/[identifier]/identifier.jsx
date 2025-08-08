'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/api/axios/axiosInstance';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react';
import CustomNode from '@/components/automation-studio/nodes/customNode';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TemplatePageSkeleton from '../../TemplatePageSkeleton';
import { useLanguage } from '@/components/language/language-provider';

function TemplatePageInner({ id }) {
  const { t } = useLanguage();
  const router = useRouter();
  const [workflow, setWorkflow] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { fitView } = useReactFlow();

  function normalizeWorkflow(data) {
    const nodes = [];
    const edges = [];

    if (Array.isArray(data.requiredProducts)) {
      data.requiredProducts.forEach((product, index) => {
        const nodeId = `node_${index}`;
        nodes.push({
          id: nodeId,
          type: 'custom',
          position: { x: 100, y: index * 200 },
          data: {
            title: product.product,
            description: `Serviços: ${product.services.map(s => s.name).join(', ')}`,
            iconName: 'ScanEye',
          },
        });

        if (index > 0) {
          edges.push({
            id: `edge_${index - 1}_${index}`,
            source: `node_${index - 1}`,
            target: nodeId,
            animated: true,
            style: { stroke: '#3b82f6', strokeWidth: 2 },
            markerEnd: { type: 'arrowclosed' },
          });
        }
      });
    }

    return {
      id: data.workflowId,
      name: data.workflowName,
      description: data.description || '',
      categories: data.categories || [],
      nodes,
      edges,
      tags: data.tags || [],
    };
  }

  useEffect(() => {
    async function fetchWorkflow() {
      try {
        const response = await axiosInstance.get(`/api/axios/templates/${id}`);
        const normalized = normalizeWorkflow(response.data);
        setWorkflow(normalized);
        setNodes(normalized.nodes);
        setEdges(normalized.edges);
      } catch (error) {
        alert(t('template.notFound'));
        router.push('/templates');
      }
    }
    fetchWorkflow();
  }, [id, router, t, setNodes, setEdges]);

  useEffect(() => {
    if (nodes.length > 0) {
      const timeout = setTimeout(() => {
        fitView({ padding: 0.3 });
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [nodes, fitView]);

  if (!workflow) {
    return <TemplatePageSkeleton />;
  }

  return (
    <div className="flex items-center justify-center gap-2 w-full" style={{ height: '85vh' }}>
      <div className="border-2 h-full w-1/4 rounded-xl shadow-xl p-4 flex flex-col gap-4 overflow-auto">
        <h1 className="text-xl font-bold mb-4">{workflow.name}</h1>
        {workflow.description && <p className="text-gray-600 text-xs">{workflow.description}</p>}

        <div>
          <h1>CATEGORIES</h1>
          <div className="flex gap-2 flex-wrap">
            {workflow.categories.length > 0 ? (
              workflow.categories.map((category, index) => (
                <Badge key={index} variant="outline">
                  {category}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 text-xs">No categories assigned</p>
            )}
          </div>
        </div>

        <Button>Use Workflow</Button>
        <Button variant="secondary" onClick={() => router.push(`/automation-studio/identifier/${id}`)}>
          Copy Workflow
        </Button>
      </div>

      <div className="h-full overflow-hidden w-2/3 bg-zinc-100 dark:bg-zinc-950 border-2 rounded-xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          nodeTypes={{ custom: CustomNode }}
          style={{ width: '100%', height: '100%' }}
          nodesDraggable
          nodesConnectable
          elementsSelectable
        >
          <Background />
          <Controls className="controls" />
          <MiniMap className="minimap" />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function TemplatePageContent({ id }) {
  return (
    <ReactFlowProvider>
      <TemplatePageInner id={id} />
    </ReactFlowProvider>
  );
}
