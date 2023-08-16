import React from 'react';
import { ICanvasShape } from '../shapes';
import { CanvasNodeComponent } from './canvas-node-component';

type CanvasNodeProps = {
  node: ICanvasShape;
};

export const CanvasNode: React.FC<CanvasNodeProps> = (props) => {
  const { node } = props;
  const { id, parentId, children } = node;

  return (
    <>
      {/* Node */}
      <CanvasNodeComponent node={node} />

      {/* Children */}
    </>
  );
};
