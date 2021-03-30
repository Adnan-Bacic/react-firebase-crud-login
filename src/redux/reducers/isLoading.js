import * as types from '../types';

const defaultState = {
  isLoadingState: false,
};

export const isLoadingReducer = (state = defaultState, action) => {
  switch (action.type) {
  case types.IS_LOADING:
    return {
      ...state,
      isLoadingState: action.payloadIsLoading,
    };

  default:
    return {
      ...state,
    };
  }
};
