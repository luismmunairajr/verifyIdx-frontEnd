'use client'
import React, { useCallback } from 'react';
import {ReactFlow,MiniMap,Controls,Background,useNodesState,useEdgesState,addEdge,ConnectionMode,Connection} from '@xyflow/react';
import Square from '@/components/automation-studio/nodes/square';
import '@xyflow/react/dist/style.css';
import Toolbar from '@/components/automation-studio/sidebar/Toolbar';
import EDGE_TYPES from '@/components/automation-studio/edges/DefaultEdge';
import { ScanEye, Fingerprint,Sparkles, List } from 'lucide-react';
import { MarkerType } from '@xyflow/react';

export default function App() {
  const NODE_TYPES = {
    square: Square,
  };

  const INITIAL_NODES = [
    {
      id: crypto.randomUUID(),
      type: 'square',
      position: { x: 200, y: 400 },
      data: {label: 'Digital Signature', icon:Fingerprint},
    },
    {
      id: crypto.randomUUID(),
      type: 'square',
      position: { x: 200, y: 800 },
      data: {label:'AI Assistant', icon:Sparkles},
    },
    {
      id: crypto.randomUUID(),
      type: 'square',
      position: { x: 800, y: 400 },
      data: {label:'Watchlist', icon:List},
    },
    
  ];

  const initialEdges = [
    {
      id: 'edge-1',
      source: 'start',
      target: 'node-1',
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed }, // Seta no final
      style: { stroke: "#3b82f6" }, // Cor azul
    },
  ];


  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback((connection: Connection)=> {
    return setEdges(edges => addEdge(connection, edges))
  }, [])

  function addSquareNode() {
      setNodes(nodes => [
        ...nodes,
        {
          id: crypto.randomUUID(),
          type: 'square',
          position: { x: 650, y: 650 },
          data: {label:'Identity Verification', icon:ScanEye},
        }
      ])
  }

  return (
    <div className='h-[85vh] w-full flex bg-zinc-100/50 dark:bg-zinc-900'>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1}/>
      </ReactFlow>
      <Toolbar onClick={addSquareNode}/>
    </div>
  );
}
