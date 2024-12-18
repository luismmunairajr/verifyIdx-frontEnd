'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import '@xyflow/react/dist/style.css';

export default function WorkflowPage() {
  const { id } = useParams(); // useParams para capturar o ID da URL
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [workflowName, setWorkflowName] = useState("");

  useEffect(() => {
    if (!id) return;

    const savedWorkflows = JSON.parse(localStorage.getItem("workflows") || "[]");
    const workflow = savedWorkflows.find((wf) => wf.id === parseInt(id, 10));

    if (workflow) {
      setNodes(workflow.nodes || []);
      setEdges(workflow.edges || []);
      setWorkflowName(workflow.name);
    } else {
      console.error("Workflow not found!");
    }
  }, [id, setNodes, setEdges]);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <ReactFlowProvider>
      <div style={{ height: "100vh", width: "100%" }}>
        <h1 className="text-center">{workflowName}</h1>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
