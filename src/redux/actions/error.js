import * as types from '../types';

export const setError = (error) => {
  return {
    type: types.SET_ERROR,
    payloadError: error,
  };
};

export const clearError = () => {
  return {
    type: types.CLEAR_ERROR,
  };
};
