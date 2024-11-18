
import { SmoothStepEdge } from '@xyflow/react';

const CustomSmoothStepEdge = (props: any) => (
  <SmoothStepEdge
    {...props}
    style={{ stroke: '#000000'}} 
  />
);

const EDGE_TYPES = {
  default: CustomSmoothStepEdge,
};

export default EDGE_TYPES;
