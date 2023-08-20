import { CanvasTreeContext } from '@context/canvas-tree/canvas-tree-context';
import { useContext } from 'react';

export const useCanvasTreeContext = () => {
  const context = useContext(CanvasTreeContext);
  if (!context) throw new Error('Tried to use CanvasTreeContext outside the provider.');

  return context;
};
