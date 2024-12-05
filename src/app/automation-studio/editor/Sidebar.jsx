import React from "react";
import { useDnD } from "./DnDContext";

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="bg-white p-4 border-r w-64 h-32 md:h-full flex md:flex-col items-center md:items-start space-y-2">
      <div className="text-sm text-gray-600 mb-2 md:mb-4">
        Drag these nodes to the canvas:
      </div>
      <div
        className="bg-blue-500 text-white px-2 py-1 rounded-md cursor-grab"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        className="bg-gray-500 text-white px-2 py-1 rounded-md cursor-grab"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>
      <div
        className="bg-pink-500 text-white px-2 py-1 rounded-md cursor-grab"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>
    </aside>
  );
};
