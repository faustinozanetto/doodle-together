'use client';

import { Toast, ToastActionType } from '../types/toasts.types';
import { useToastContext } from './use-toast-context';

/**
 * Hook that returns a function to create toasts.
 * @returns The function to create toast.
 */
export const useToast = () => {
  const { dispatch } = useToastContext();

  const toast = (toast: Omit<Toast, 'id'>, duration: number = 3000) => {
    const toastId = Math.random().toString(12).substring(2, 10);

    dispatch({
      type: ToastActionType.ADD_TOAST,
      payload: {
        toast: { ...toast, id: toastId },
      },
    });

    setTimeout(() => {
      dispatch({
        type: ToastActionType.REMOVE_TOAST,
        payload: {
          toast: toastId,
        },
      });
    }, duration);
  };

  return { toast };
};
