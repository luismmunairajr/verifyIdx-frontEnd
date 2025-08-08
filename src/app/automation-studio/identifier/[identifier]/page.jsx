'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/components/language/language-provider';
import { DnDProvider, useDnD } from '@/components/automation-studio/DnDContext';
import { TabSidebar } from '@/components/automation-studio/TabSidebar';
import axiosInstance from '@/app/api/axios/axiosInstance';
import allNodes from '@/components/automation-studio/NodeData';
import iconMap from '@/components/automation-studio/iconMap';
import WorkflowHeader from "./WorkflowHeader.jsx";
import '@/components/automation-studio/nodes/index.css';

let id = 0;
const getId = () => `node_${id++}`;

function Checkbox({ id, checked, label, onChange }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(event) => {
          event.stopPropagation();  
          onChange(event);
        }}
        className="mr-2 h-4 w-4"
      />
      <label htmlFor={id} className="text-sm cursor-pointer">
        {label}
      </label>
    </div>
  );
}


// Custom Node
const CustomNode = ({ data, selected }) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const IconComponent = iconMap[data.iconName] || <span>🚫</span>;
  const options = data.options || {};
  const handleOptionChange = (option) => {
    const newOptions = {
      ...options,
      [option]: !options[option],
    };
    if (data.onOptionsChange) {
      data.onOptionsChange(newOptions);
    }
  };

  const isIdentity = data.title === 'identityVerification';
  const isGovernment = data.title === 'governmentScreening';

  return (
    <div
      className={`flex flex-col rounded-lg bg-white dark:bg-black border border-black dark:border-white text-black dark:text-white h-auto min-h-[125px] w-[400px] p-5 ${
        selected ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <div className="flex items-center relative">
        <div className="flex justify-center items-center text-black dark:text-white ml-2">
          {IconComponent}
        </div>

        <div className="ml-3 flex-1">
          <div className="text-lg font-bold mb-1">{t(data.title)}</div>
          <div className="text-zinc-600 dark:text-zinc-300 text-left">{t(data.description)}</div>
        </div>

        {(isIdentity || isGovernment) && (
          <button
            className="absolute right-4 top-1 text-white dark:text-zinc-400 hover:bg-zinc-100 bg-blue-500 dark:hover:bg-zinc-800 p-1 rounded"
            onClick={() => setIsExpanded(!isExpanded)}
            type="button"
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700">
          {isIdentity && (
            <>
              <div className="text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">
                {t('verificationMethods')}:
              </div>
              <div className="space-y-2">
                <Checkbox
                  id={`liveness-${data.id}`}
                  checked={options.liveness}
                  label={t('livenessDetection')}
                  onChange={() => handleOptionChange('liveness')}
                />
                <Checkbox
                  id={`idscan-${data.id}`}
                  checked={options.idscan}
                  label={t('idScan')}
                  onChange={() => handleOptionChange('idscan')}
                />
                <Checkbox
                  id={`photoIDMatch-${data.id}`}
                  checked={options.photoIDMatch}
                  label={t('photoIDMatch')}
                  onChange={() => handleOptionChange('photoIDMatch')}
                />
                <Checkbox
                  id={`enrollment-${data.id}`}
                  checked={options.enrollment}
                  label={t('enrollment')}
                  onChange={() => handleOptionChange('enrollment')}
                />
              </div>
            </>
          )}

          {isGovernment && (
            <>
              <div className="text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">
                {t('governmentChecks')}:
              </div>
              <div className="space-y-2">
                <Checkbox
                  id={`nuit-${data.id}`}
                  checked={options.nuit}
                  label={t('nuit')}
                  onChange={() => handleOptionChange('nuit')}
                />
                <Checkbox
                  id={`nuib-${data.id}`}
                  checked={options.nuib}
                  label={t('nuib')}
                  onChange={() => handleOptionChange('nuib')}
                />
              </div>
            </>
          )}
        </div>
      )}

      <Handle type="target" position={Position.Top} className="w-4 h-4" />
      <Handle type="source" position={Position.Bottom} className="w-4 h-4" />
    </div>
  );
};

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

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) return;

      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });

      const meta = allNodes.find(n => n.id === type.id);
      const newNode = {
        id: getId(),
        type: 'custom',
        position,
        data: {
          ...meta,
          options: {},
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
          onDragOver={(e) => e.preventDefault()}
          fitView
          nodeTypes={{ custom: CustomNode }}
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
  const { identifier: id } = useParams();
  const [workflow, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function normalizeWorkflow(data) {
    const nodes = [];
    const edges = [];

    if (Array.isArray(data.requiredProducts)) {
      data.requiredProducts.forEach((product, index) => {
        const nodeId = `node_${index}`;
        const meta = allNodes.find((n) =>
          product.product.includes('identity') ? n.id === 'identity' : n.id === 'government'
        );

        const options = {};
        product.services.forEach((service) => {
          options[service.name] = true;
        });

        nodes.push({
          id: nodeId,
          type: 'custom',
          position: { x: 100, y: index * 200 },
          data: {
            ...meta,
            options,
          },
        });

        if (index > 0) {
          edges.push({
            id: `edge_${index - 1}_${index}`,
            source: `node_${index - 1}`,
            target: nodeId,
            animated: true,
            style: { stroke: '#3b82f6', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed },
          });
        }
      });
    }

    return {
      id: data.workflowId,
      name: data.workflowName,
      nodes,
      edges,
    };
  }

  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        const res = await axiosInstance.get(`/api/axios/templates/${id}`);
        const normalized = normalizeWorkflow(res.data);
        setWorkflow(normalized);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflow();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ReactFlowProvider>
      <DnDProvider>
        <DnDFlow workflow={workflow} />
      </DnDProvider>
    </ReactFlowProvider>
  );
}
