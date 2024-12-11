'use client';

import React, { useRef, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  MarkerType,
  BackgroundVariant,
  MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DnDProvider, useDnD } from './DnDContext';
import CustomNode from '@/components/automation-studio/nodes/CustomNode';
import { TabSidebar } from './TabSidebar';
import "@/components/automation-studio/nodes/index.css"

let id = 0;
const getId = () => `node_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: '#3b82f6', strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed
            }
          },
          eds
        )
      ),
    []
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
          icon: type.icon,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
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
      <TabSidebar />
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
