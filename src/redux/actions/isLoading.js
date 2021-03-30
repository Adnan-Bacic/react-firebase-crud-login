import * as types from '../types';

export const setIsLoading = (isLoading) => {
  return {
    type: types.IS_LOADING,
    payloadIsLoading: isLoading,
  };
};
