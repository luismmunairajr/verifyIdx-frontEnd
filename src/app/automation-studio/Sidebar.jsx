import React from 'react';
import { useDnD } from './DnDContext';
import { ScanEye, Fingerprint, Sparkles, List } from 'lucide-react';

export default function Sidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeData) => {
    setType(nodeData);
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodes = [
    {
      id: 'identity',
      icon: <ScanEye size={40} />,
      title: 'Identity Verification',
      description: 'Confirms identity using biometric and document checks to prevent fraud.',
    },
    {
      id: 'signature',
      icon: <Fingerprint size={40} />,
      title: 'Digital Signature',
      description: 'Authenticates documents securely, ensuring integrity and trust.',
    },
    {
      id: 'assistant',
      icon: <Sparkles size={40} />,
      title: 'AI Assistant',
      description: 'Provides smart insights and recommendations using AI.',
    },
    {
      id: 'watchlist',
      icon: <List size={40} />,
      title: 'Watchlist',
      description: 'Monitors entities in real-time for compliance and risk control.',
    },
  ];

  return (
    <aside className="bg-white border border-gray-200 p-4 text-xs h-full w-2/5 flex flex-col gap-2 dark:bg-black">
      <div className="mb-4 text-gray-700">Drag these nodes to create your flow:</div>
      {nodes.map((node) => (
        <div
          className="border p-2 rounded-sm border-blue-700 text-center mb-2 cursor-grab flex h-20 gap-2"
          key={node.id}
          onDragStart={(event) => onDragStart(event, node)}
          draggable
        >
          <div className="flex items-center justify-center h-full bg-blue-800 rounded text-white">
            {node.icon}
          </div>
          <div className="flex flex-col items-start w-full">
            <h1 className="font-semibold">{node.title}</h1>
            <p className="text-justify">{node.description}</p>
          </div>
        </div>
      ))}
    </aside>
  );
}
