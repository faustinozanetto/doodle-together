import { useCanvasCustomizationContext } from './use-canvas-customization-context';
import { CanvasCustomizationActionType, CanvasCustomizationContextState } from '@context/canvas-customization/types';

interface UseCanvasCustomizationInterface extends CanvasCustomizationContextState {
  setColor: (color: CanvasCustomizationContextState['customization']['color']) => void;
  setSize: (size: CanvasCustomizationContextState['customization']['size']) => void;
  setStyle: (style: CanvasCustomizationContextState['customization']['style']) => void;
}

export const useCanvasCustomization = (): UseCanvasCustomizationInterface => {
  const { state, dispatch } = useCanvasCustomizationContext();

  const setColor = (color: CanvasCustomizationContextState['customization']['color']) => {
    dispatch({ type: CanvasCustomizationActionType.SET_COLOR, payload: { color } });
  };

  const setSize = (size: CanvasCustomizationContextState['customization']['size']) => {
    dispatch({ type: CanvasCustomizationActionType.SET_SIZE, payload: { size } });
  };

  const setStyle = (style: CanvasCustomizationContextState['customization']['style']) => {
    dispatch({ type: CanvasCustomizationActionType.SET_STYLE, payload: { style } });
  };

  return {
    setColor,
    setSize,
    setStyle,
    customization: state.customization,
  };
};
