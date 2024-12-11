import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import './index.css';

function CustomNode({ data }) {
  return (
    <div className={"custom-node"}>
      <div className="custom-node-content">
        <div className="custom-node-icon">
          {data.icon}
        </div>
        <div className='custon-none-text'>
          <div className={"custom-node-title"}>
            {data.title}
          </div>
          <div className="custom-node-description">
            {data.description}
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="handle"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="handle"
      />
    </div>
  );
}

export default memo(CustomNode);
