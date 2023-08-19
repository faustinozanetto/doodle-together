import React from 'react';
import { useCamera } from '../../hooks/use-camera';

type CanvasNodesContainerProps = {
  children: React.ReactNode;
};

const CanvasNodesContainer: React.FC<CanvasNodesContainerProps> = (props) => {
  const { children } = props;

  const { zoom, position } = useCamera();

  const transform = `scale(${zoom}) translate(${position.x}px, ${position.y}px)`;

  return (
    <div
      className="absolute top-0 left-0 w-1 h-1 pointer-events-none z-[200]"
      style={{
        transform,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </div>
  );
};

export default CanvasNodesContainer;
