import { SmoothStepEdge } from '@xyflow/react';
import React from 'react';

const CustomSmoothStepEdge = (props: any) => {
  const markerId = 'arrowhead';

  return (
    <>
      <svg>
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#000000" />
          </marker>
        </defs>
      </svg>
      <SmoothStepEdge
        {...props}
        style={{ stroke: '#000000', strokeWidth: 2 }}
        markerEnd={`url(#${markerId})`}
      />
    </>
  );
};

const EDGE_TYPES = {
  default: CustomSmoothStepEdge,
};

export default EDGE_TYPES;
