import { CanvasCoreContext } from '@context/canvas-core/canvas-core-context';
import { useContext } from 'react';

export const useCanvasCoreContext = () => {
  const context = useContext(CanvasCoreContext);
  if (!context) throw new Error('Tried to use CanvasCoreContext outside the provider.');

  return context;
};
