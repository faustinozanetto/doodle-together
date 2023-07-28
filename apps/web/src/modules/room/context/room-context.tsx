'use client';

import React, { createContext, useReducer } from 'react';
import { RoomContextData } from '../types/room.types';
import { reducer } from './reducer';

const initialState: RoomContextData = {
  state: {
    tool: 'pencil',
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

  return <RoomContext.Provider value={{ state, dispatch }}>{children}</RoomContext.Provider>;
};
