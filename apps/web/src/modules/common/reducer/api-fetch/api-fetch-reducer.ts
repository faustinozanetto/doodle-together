import { ApiFetchActionType, ApiFetchActions, ApiFetchState } from '@modules/common/types/api-fetch.types';

export const reducer = <T>(state: ApiFetchState<T>, action: ApiFetchActions<T>): ApiFetchState<T> => {
  switch (action.type) {
    case ApiFetchActionType.SET_DATA: {
      return {
        ...state,
        data: action.payload.data,
      };
    }
    case ApiFetchActionType.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }
    case ApiFetchActionType.SET_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default:
      throw new Error('The action you requested does not exists!');
  }
};
