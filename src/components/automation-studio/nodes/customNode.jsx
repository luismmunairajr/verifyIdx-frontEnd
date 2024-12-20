import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import './index.css';
import iconMap from "@/components/automation-studio/iconMap"


function CustomNode({ data }) {
  const { title, description, iconName } = data
  const IconComponent = iconMap[iconName] || <span>Invalid Icon</span>

  return (
    <div className="custom-node">
      <div className="custom-node-content">
        <div className="custom-node-icon">
          {IconComponent}
        </div>
        <div className="custom-node-text">
          <div className="custom-node-title">{title}</div>
          <div className="custom-node-description">{description}</div>
        </div>
      </div>

      <Handle type="target" position={Position.Top} className="handle" />
      <Handle type="source" position={Position.Bottom} className="handle" />
    </div>
  );
}

export default memo(CustomNode);
