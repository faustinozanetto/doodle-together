import { ActionMap } from '@modules/common/types/common.types';

export type ApiFetchState<T> = {
  data: T | null;
  error: unknown | null;
  isLoading: boolean;
};

export enum ApiFetchActionType {
  SET_DATA,
  SET_ERROR,
  SET_IS_LOADING,
}

export type ApiFetchPayload<T> = {
  [ApiFetchActionType.SET_DATA]: {
    data: T;
  };
  [ApiFetchActionType.SET_IS_LOADING]: {
    isLoading: boolean;
  };
  [ApiFetchActionType.SET_ERROR]: {
    error: unknown;
  };
};

export type ApiFetchActions<T> = ActionMap<ApiFetchPayload<T>>[keyof ActionMap<ApiFetchPayload<T>>];
