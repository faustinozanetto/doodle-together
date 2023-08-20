import React, { createContext, useMemo, useReducer } from 'react';
import { canvasTreeReducer } from './reducer';
import { CanvasTreeContextData } from './types';

const initialState: CanvasTreeContextData = {
  state: {
    nodes: [],
    selectedNodeId: '',
  },
  dispatch: () => {},
};

export const CanvasTreeContext = createContext<CanvasTreeContextData>(initialState);

type CanvasTreeProviderProps = {
  children: React.ReactNode;
};

export const CanvasTreeProvider: React.FC<CanvasTreeProviderProps> = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(canvasTreeReducer, initialState.state);

  const memoized = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return <CanvasTreeContext.Provider value={memoized}>{children}</CanvasTreeContext.Provider>;
};

CanvasTreeContext.displayName = 'CanvasTreeContext';
