import React, { createContext, useMemo, useReducer } from 'react';
import { CameraContextData } from './types';
import { reducer } from './reducer';

const initialState: CameraContextData = {
  state: {
    position: { x: 0, y: 0 },
    zoom: 1,
  },
  dispatch: () => {},
};

export const CameraContext = createContext<CameraContextData>(initialState);

type CameraProviderProps = {
  children: React.ReactNode;
};

export const CameraProvider: React.FC<CameraProviderProps> = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState.state);

  const memoized = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return <CameraContext.Provider value={memoized}>{children}</CameraContext.Provider>;
};
