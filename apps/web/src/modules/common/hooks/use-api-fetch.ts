import { useToast } from '@modules/ui/components/toasts/hooks/use-toast';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useReducer } from 'react';
import { reducer } from '../reducer/api-fetch/api-fetch-reducer';
import { ApiFetchActionType } from '../types/api-fetch.types';

type UseApiFetchProps<TData> = {
  /** API Endpoint to call. Example '/rooms/join' must start with a slash. */
  endpoint: string;
  /**
   * Callback function called when data is successfully fetched.
   * @param data Data fetched.
   * @returns Void.
   */
  onDataFetched: (data: TData) => void;
};

export const useApiFetch = <TData>({ endpoint, onDataFetched }: UseApiFetchProps<TData>) => {
  const [state, dispatch] = useReducer(reducer<TData>, {
    data: null,
    error: null,
    isLoading: false,
  });

  const { toast } = useToast();

  useEffect(() => {
    if (!state.data) return;

    onDataFetched(state.data);
  }, [state.data]);

  const fetch = useCallback(
    async (options?: AxiosRequestConfig) => {
      try {
        dispatch({ type: ApiFetchActionType.SET_IS_LOADING, payload: { isLoading: true } });

        const url = new URL(`/api${endpoint}`, `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}`);

        const response = await axios<TData>(url.toString(), {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          },
          ...options,
        });

        const { data } = response;
        dispatch({ type: ApiFetchActionType.SET_DATA, payload: { data } });
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage = error.response ? error.response.data.message : error.message;
          toast({ variant: 'danger', content: errorMessage });
        }
        dispatch({ type: ApiFetchActionType.SET_ERROR, payload: { error } });
      } finally {
        dispatch({ type: ApiFetchActionType.SET_IS_LOADING, payload: { isLoading: false } });
      }
    },
    [endpoint]
  );

  return { state, fetch };
};
