'use client';

import React, { createContext, useReducer } from 'react';
import { ToastContextState } from '../types/toasts.types';
import { reducer } from './reducer';

const initialState: ToastContextState = {
  state: { toasts: [] },
  dispatch: () => {},
};

export const ToastContext = createContext<ToastContextState>(initialState);

type ToastsProviderProps = {
  children: React.ReactNode;
};

export const ToastsProvider: React.FC<ToastsProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, {
    ...initialState.state,
  });

  return <ToastContext.Provider value={{ state, dispatch }}>{children}</ToastContext.Provider>;
};
