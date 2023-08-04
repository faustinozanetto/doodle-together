'use client';

import React, { createContext, useMemo, useReducer } from 'react';
import { RoomContextData } from '../types/room.types';
import { reducer } from './reducer';

const initialState: RoomContextData = {
  state: {
    tool: 'pencil',
    toolCustomization: {
      color: '#ababab',
      size: 'medium',
      style: 'solid',
    },
  },
  dispatch: () => {},
};

export const RoomContext = createContext<RoomContextData>(initialState);

type RoomProviderProps = {
  children: React.ReactNode;
};

export const RoomProvider: React.FC<RoomProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, {
    ...initialState.state,
  });

  const memoizedValue = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return <RoomContext.Provider value={memoizedValue}>{children}</RoomContext.Provider>;
};
