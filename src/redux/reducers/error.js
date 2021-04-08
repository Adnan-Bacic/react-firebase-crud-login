import * as types from '../types';

const defaultState = {
  errorMessage: null,
};

export const errorReducer = (state = defaultState, action) => {
  switch (action.type) {
  case types.SET_ERROR:
    return {
      ...state,
      errorMessage: action.payloadError,
    };

  case types.CLEAR_ERROR:
    return {
      ...state,
      errorMessage: null,
    };

  default:
    return {
      ...state,
    };
  }
};
