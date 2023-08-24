import { useCanvasCustomization } from '@hooks/customization/use-canvas-customization';
import React from 'react';

export const CanvasBackground: React.FC = () => {
  const { background } = useCanvasCustomization();
  const { enableGrid, gridSize } = background;

  const styles: React.CSSProperties = {
    backgroundImage: enableGrid
      ? 'linear-gradient(to right, hsl(var(--border)), 1px, transparent 1px), linear-gradient(hsl(var(--border)), 1px, transparent 1px)'
      : '',
    backgroundSize: `${gridSize}px ${gridSize}px`,
  };

  return <div id="canvas-background" className="absolute inset-0 pointer-events-none select-none" style={styles} />;
};
