import { CanvasCustomizationContext } from '@context/canvas-customization/canvas-customization-context';
import { useContext } from 'react';

export const useCanvasCustomizationContext = () => {
  const context = useContext(CanvasCustomizationContext);
  if (!context) throw new Error('Tried to use CanvasCustomizationContext outside the provider.');

  return context;
};
