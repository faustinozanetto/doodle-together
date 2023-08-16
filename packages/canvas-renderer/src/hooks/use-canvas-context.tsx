import { useContext } from 'react';
import { CanvasContext } from '../context';

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  if (!context) throw new Error('Tried to use canvas context outside the provider.');

  return context;
};
