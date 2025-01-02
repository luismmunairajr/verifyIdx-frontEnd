// components/DnDFlow.tsx
"use client";
import React, { useRef, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ReactFlow, ReactFlowProvider, addEdge, useNodesState, useEdgesState,
  Controls, useReactFlow, Background, MarkerType, BackgroundVariant, MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DnDProvider, useDnD } from './DnDContext';
import CustomNode from '@/components/automation-studio/nodes/CustomNode';
import { TabSidebar } from './TabSidebar';
import "@/components/automation-studio/nodes/index.css";

let id = 0;
const getId = () => `node_${id++}`;

const DnDFlow = () => {
  const searchParams = useSearchParams();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  useEffect(() => {
    const workflowId = searchParams.get('workflowId');

    if (workflowId) {
      const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
      const workflow = savedWorkflows.find(wf => wf.id === Number(workflowId));

      if (workflow) {
        const highestId = Math.max(...workflow.nodes.map(node => {
          const numericId = parseInt(node.id.replace('node_', ''));
          return isNaN(numericId) ? 0 : numericId;
        }));
        id = highestId + 1;

        setNodes(workflow.nodes);
        setEdges(workflow.edges);
      }
    }
  }, [searchParams, setNodes, setEdges]);

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
    <div className="flex h-full items-center justify-center" style={{ height: "85vh" }}>
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
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
