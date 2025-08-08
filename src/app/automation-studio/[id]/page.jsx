"use client";
import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ReactFlow, ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls, useReactFlow, Background, MarkerType, BackgroundVariant, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DnDProvider, useDnD } from '@/components/automation-studio/DnDContext';
import CustomNode from '@/components/automation-studio/nodes/customNode';
import { TabSidebar } from '@/components/automation-studio/TabSidebar';
import "@/components/automation-studio/nodes/index.css";
import WorkflowHeader from "./WorkflowHeader.jsx";

let id = 0;
const getId = () => `node_${id++}`;

const DnDFlow = ({ workflow }) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  useEffect(() => {
    if (workflow) {
      const highestId = Math.max(...workflow.nodes.map(node => {
        const numericId = parseInt(node.id.replace('node_', ''));
        return isNaN(numericId) ? 0 : numericId;
      }));
      id = highestId + 1;

      setNodes(workflow.nodes);
      setEdges(workflow.edges);
    }
  }, [workflow, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: '#3b82f6', strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: 'custom',
        position,
        data: {
          title: type.title,
          description: type.description,
          iconName: type.iconName,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes]
  );

  return (
     <div className="flex flex-col h-full">
        <WorkflowHeader nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
          <div className="flex items-center justify-center h-[calc(100vh-80px)]">
         <div
        className="h-full overflow-hidden w-full bg-zinc-100 dark:bg-zinc-950"
        ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          nodeTypes={{
            custom: CustomNode,
          }}>
          <Controls className='controls' />
          <Background variant={BackgroundVariant.Dots} />
          <MiniMap className='minimap' />
        </ReactFlow>
      </div>
      <TabSidebar nodes={nodes} edges={edges} />
    </div>
    </div>
  );
};

export default function AutomationStudioPage({ params }) {
  const { id } = params;
  const [workflow, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflow();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ReactFlowProvider>
      <DnDProvider>
        <DnDFlow workflow={workflow} />
      </DnDProvider>
    </ReactFlowProvider>
  );
}