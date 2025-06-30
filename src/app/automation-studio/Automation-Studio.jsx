"use client";
<<<<<<< HEAD

=======
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
import React, { useRef, useCallback, useEffect } from "react";
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
<<<<<<< HEAD

=======
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
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
<<<<<<< HEAD
  const [type] = useDnD(); // esse "type" deve conter title, description, iconName
=======
  const [type] = useDnD();
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "#3b82f6", strokeWidth: 2 },
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
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

<<<<<<< HEAD
      if (!type) return;
=======
      if (!type) {
        return;
      }
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

<<<<<<< HEAD
=======
      // Novo ID para o nó
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
      const newId = getId();

      const newNode = {
        id: newId,
<<<<<<< HEAD
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
=======
        type: type.title === "Condition" ? "condition" : "custom", // Defina o tipo do nó
        position,
        data: {
          id: newId, // Passar o ID para o data também para uso nos checkboxes
          title: type.title,
          description: type.description,
          iconName: type.iconName,
          condition:
            type.title === "Condition"
              ? { leftOperand: "", operator: ">", rightOperand: "" }
              : null, // Inicialize a condição se for um nó de condição

          // Inicializar opções se for Identity Verification
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
          options:
            type.title === "Identity Verification"
              ? { liveness: false, idscan: false, photoIDMatch: false }
              : undefined,
<<<<<<< HEAD
          onOptionsChange: (newOptions) => {
            setNodes((nds) =>
              nds.map((node) =>
                node.id === newId
                  ? {
                      ...node,
                      data: {
                        ...node.data,
                        options: newOptions,
                      },
                    }
                  : node
              )
=======
          // Função para atualizar opções
          onOptionsChange: (newOptions) => {
            setNodes((nds) =>
              nds.map((node) => {
                if (node.id === newId) {
                  // Preservar todas as outras propriedades do nó e do data
                  return {
                    ...node,
                    data: {
                      ...node.data,
                      options: newOptions,
                    },
                  };
                }
                return node;
              })
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
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
<<<<<<< HEAD
      <WorkflowHeader nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
=======
      <WorkflowHeader nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges}/>
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
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
<<<<<<< HEAD
            proOptions={{ hideAttribution: true }} // 🔥 remove a marca d'água
=======
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
          >
            <Controls className="controls" />
            <Background variant={BackgroundVariant.Dots} />
            <MiniMap className="minimap" />
          </ReactFlow>
        </div>
<<<<<<< HEAD

=======
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
        <TabSidebar nodes={nodes} edges={edges} />
      </div>
    </div>
  );
};

<<<<<<< HEAD
// Exporta o flow com os providers
export default function AutomationStudioPage() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <DnDFlow />
      </DnDProvider>
    </ReactFlowProvider>
  );
}
=======
export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
