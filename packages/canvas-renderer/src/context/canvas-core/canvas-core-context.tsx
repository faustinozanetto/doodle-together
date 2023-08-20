import { CanvasShapeTypes } from '@shapes/types';
import { createContext, useReducer } from 'react';
import { canvasCoreReducer } from './reducer';
import { CanvasCoreContextData } from './types';

const initialState: CanvasCoreContextData = {
  state: {
    selectedShape: CanvasShapeTypes.Draw,
    bounds: {
      min: { x: Infinity, y: Infinity },
      max: { x: -Infinity, y: -Infinity },
    },
    canvasRef: null,
  },
  dispatch: () => null,
};

export const CanvasCoreContext = createContext<CanvasCoreContextData>(initialState);

type CanvasCoreProviderProps = {
  children: React.ReactNode;
};

export const CanvasCoreProvider: React.FC<CanvasCoreProviderProps> = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(canvasCoreReducer, initialState.state);

  return <CanvasCoreContext.Provider value={{ state, dispatch }}>{children}</CanvasCoreContext.Provider>;
};

CanvasCoreContext.displayName = 'CanvasCoreContext';
