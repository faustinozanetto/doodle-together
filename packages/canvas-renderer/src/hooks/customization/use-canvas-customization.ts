import { useCanvasCustomizationStore } from '@state/canvas-customization.slice';

export const useCanvasCustomization = () => {
  const { setColor, setSize, setStyle, customization } = useCanvasCustomizationStore();

  return {
    setColor,
    setSize,
    setStyle,
    customization,
  };
};
