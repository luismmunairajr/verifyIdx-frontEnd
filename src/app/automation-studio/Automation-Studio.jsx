"use client";

import React, { useRef, useCallback } from "react";
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
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { DnDProvider, useDnD } from "@/components/automation-studio/DnDContext";
import CustomNode from "@/components/automation-studio/nodes/customNode";
import ConditionNode from "@/components/automation-studio/nodes/conditionNode";
import { TabSidebar } from "@/components/automation-studio/TabSidebar";
import "@/components/automation-studio/nodes/index.css";
import WorkflowHeader from "@/components/automation-studio/WorkflowHeader.jsx";

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
            style: { stroke: "#3b82f6", strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newId = getId();

      const newNode = {
        id: newId,
        type: type.title === "Condition" ? "condition" : "custom",
        position,
        data: {
          id: newId,
          title: type.title || "Untitled",
          description: type.description || "Sem descrição",
          iconName: type.iconName || "info",
          condition:
            type.title === "Condition"
              ? { leftOperand: "", operator: ">", rightOperand: "" }
              : null,
          options:
            type.title === "Identity Verification"
              ? { liveness: false, idscan: false, photoIDMatch: false }
              : undefined,
          onOptionsChange: (newOptions) => {
            setNodes((nds) =>
              nds.map((node) =>
                node.id === newId
                  ? { ...node, data: { ...node.data, options: newOptions } }
                  : node
              )
            );
          },
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
          ref={reactFlowWrapper}
        >
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
              condition: ConditionNode,
            }}
            proOptions={{ hideAttribution: true }}
          >
            <Controls className="controls" />
            <Background variant={BackgroundVariant.Dots} />
            <MiniMap className="minimap" />
          </ReactFlow>
        </div>
        <TabSidebar nodes={nodes} edges={edges} />
      </div>
    </div>
  );
};

export default function AutomationStudioPage() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <DnDFlow />
      </DnDProvider>
    </ReactFlowProvider>
  );
}
