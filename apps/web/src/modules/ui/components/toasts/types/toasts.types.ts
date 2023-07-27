import { VariantProps } from 'class-variance-authority';
import { toastVariants } from '../components/toast';

export type ToastsActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type Toast = {
  id: string;
  variant: VariantProps<typeof toastVariants>['variant'];
  content: string;
};

export type ToastState = {
  toasts: Toast[];
};

export type ToastContextState = {
  state: ToastState;
  dispatch: React.Dispatch<ToastActions>;
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

export type ToastActions = ToastsActionMap<ToastPayload>[keyof ToastsActionMap<ToastPayload>];
