import React from 'react';
import { useDnD } from './DnDContext';
import nodes from '@/components/automation-studio/NodeData';
export default function Sidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeData) => {
    setType(nodeData);
    event.dataTransfer.effectAllowed = 'move';
  };

  
  return (
    <aside className="bg-white border border-gray-200 p-4 text-xs h-full overflow-y-auto w-full flex flex-col gap-2 dark:bg-black">
      <div className="mb-4 text-gray-700">Drag these nodes to create your flow:</div>
      {nodes.map((node) => (
        <div
          className="border p-2 rounded-sm border-black dark:border-white  ite text-center mb-2 cursor-grab flex h-20 gap-2"
          key={node.id}
          onDragStart={(event) => onDragStart(event, node)}
          draggable
        >
          <div className="flex items-center justify-center h-full text-black rounded dark:text-white">
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
