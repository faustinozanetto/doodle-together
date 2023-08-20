import { useContext } from 'react';
import { CanvasCameraContext } from '@context/canvas-camera/canvas-camera-context';

export const useCanvasCameraContext = () => {
  const context = useContext(CanvasCameraContext);
  if (!context) throw new Error('Tried to use CanvasCameraContext outside the provider.');

  return context;
};
