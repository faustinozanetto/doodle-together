import React, { createContext, useMemo, useReducer } from 'react';
import { CanvasCameraContextData } from './types';
import { canvasCameraReducer } from './reducer';

const initialState: CanvasCameraContextData = {
  state: {
    position: { x: 0, y: 0 },
    zoom: 1,
  },
  dispatch: () => {},
};

export const CanvasCameraContext = createContext<CanvasCameraContextData>(initialState);

type CanvasCameraProviderProps = {
  children: React.ReactNode;
};

export const CanvasCameraProvider: React.FC<CanvasCameraProviderProps> = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(canvasCameraReducer, initialState.state);

  const memoized = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return <CanvasCameraContext.Provider value={memoized}>{children}</CanvasCameraContext.Provider>;
};

CanvasCameraContext.displayName = 'CanvasCameraContext';
