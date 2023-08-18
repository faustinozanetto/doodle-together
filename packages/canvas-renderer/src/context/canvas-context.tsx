import React, { createContext, useMemo, useReducer } from 'react';
import { reducer } from './reducer';
import { CanvasContextData } from './types';

const initialState: CanvasContextData = {
  state: {
    nodes: [],
  },
  dispatch: () => {},
};

export const CanvasContext = createContext<CanvasContextData>(initialState);

type CanvasProviderProps = {
  children: React.ReactNode;
};

export const CanvasProvider: React.FC<CanvasProviderProps> = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState.state);

  const memoized = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return <CanvasContext.Provider value={memoized}>{children}</CanvasContext.Provider>;
};
