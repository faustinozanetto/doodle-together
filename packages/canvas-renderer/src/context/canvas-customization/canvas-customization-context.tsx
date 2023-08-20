import { createContext, useReducer, useMemo } from 'react';
import { canvasCustomizationReducer } from './reducer';
import { CanvasCustomizationContextData } from './types';
import { ShapeUtils } from '@shapes/shape-utils';

const initialState: CanvasCustomizationContextData = {
  state: {
    customization: ShapeUtils.getShapeBaseCustomization(),
  },
  dispatch: () => {},
};

export const CanvasCustomizationContext = createContext<CanvasCustomizationContextData>(initialState);

type CanvasCustomizationProviderProps = {
  children: React.ReactNode;
};

export const CanvasCustomizationProvider: React.FC<CanvasCustomizationProviderProps> = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(canvasCustomizationReducer, initialState.state);

  const memoized = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return <CanvasCustomizationContext.Provider value={memoized}>{children}</CanvasCustomizationContext.Provider>;
};

CanvasCustomizationContext.displayName = 'CanvasCustomizationContext';
