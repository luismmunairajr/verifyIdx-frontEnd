import React from 'react';
import { useDnD } from './DnDContext';

export default function Sidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 bg-white border border-gray-200 p-4 text-xs h-full flex-shrink-0  flex flex-col gap-2">
      <div className="mb-4 text-gray-700">
        You can drag these nodes to the pane on the left.
      </div>
      <div
        className="border p-2 rounded-sm border-blue-700 text-center mb-2 cursor-grab"
        onDragStart={(event) => onDragStart(event, 'input')}
        draggable>
        Input Node
      </div>
      <div
        className="border p-2 rounded-sm border-gray-800 text-center mb-2 cursor-grab"
        onDragStart={(event) => onDragStart(event, 'default')}
        draggable>
        Default Node
      </div>
      <div
        className="border p-2 rounded-sm border-red-700 text-center cursor-grab"
        onDragStart={(event) => onDragStart(event, 'output')}
        draggable>
        Output Node
      </div>
    </aside>
  );
}
