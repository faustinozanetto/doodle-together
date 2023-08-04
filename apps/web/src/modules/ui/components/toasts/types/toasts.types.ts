import React from 'react';
import { ActionMap } from '@modules/common/types/common.types';

export type ToastVariant = 'success' | 'danger' | 'info';

export type Toast = {
  content: string;
  id: string;
  variant: ToastVariant;
};

export type ToastState = {
  toasts: Toast[];
};

export type ToastContextState = {
  dispatch: React.Dispatch<ToastActions>;
  state: ToastState;
};

export enum ToastActionType {
  ADD_TOAST,
  REMOVE_TOAST,
  REMOVE_ALL_TOASTS,
}

type ToastPayload = {
  [ToastActionType.ADD_TOAST]: {
    toast: Toast;
  };
  [ToastActionType.REMOVE_TOAST]: {
    toast: Toast['id'];
  };
  [ToastActionType.REMOVE_ALL_TOASTS]: {};
};

export type ToastActions = ActionMap<ToastPayload>[keyof ActionMap<ToastPayload>];
