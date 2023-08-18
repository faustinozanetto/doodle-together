import React from 'react';
import { CanvasNodeComponent } from './canvas-node-component';
import { CanvasNode as CanvasNodeData } from '../context/types';

type CanvasNodeProps = {
  node: CanvasNodeData;
};

export const CanvasNode: React.FC<CanvasNodeProps> = (props) => {
  const { node } = props;

  return <CanvasNodeComponent node={node} />;
};
