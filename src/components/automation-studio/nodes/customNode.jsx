import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
 
function CustomNode({ data }) {
  return (
    <div className="px-4 py-2 rounded-md bg-white border border-black h-44">
      <div className="flex gap-2">
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100 dark:bg-zinc-950">
          {data.icon}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold text-black">{data.title}</div>
          <div className="text-gray-500">{data.description}</div>
        </div>
      </div>
 
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />
    </div>
  );
}
 
export default memo(CustomNode);