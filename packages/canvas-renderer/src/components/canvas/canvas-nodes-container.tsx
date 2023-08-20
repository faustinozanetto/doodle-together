import React from 'react';
import { useCanvasCamera } from '@hooks/camera/use-canvas-camera';

type CanvasNodesContainerProps = {
  children: React.ReactNode;
};

export const CanvasNodesContainer: React.FC<CanvasNodesContainerProps> = (props) => {
  const { children } = props;

  const { zoom, position } = useCanvasCamera();

  const transform = `scale(${zoom}) translate(${position.x}px, ${position.y}px)`;

  return (
    <div
      className="absolute top-0 left-0 w-1 h-1 pointer-events-none"
      style={{
        transform,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </div>
  );
};
