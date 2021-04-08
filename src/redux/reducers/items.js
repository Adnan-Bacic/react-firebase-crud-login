import * as types from '../types';

const defaultState = {
  firebaseItems: null,
  singleItem: null,
};

export const itemsReducer = (state = defaultState, action) => {
  switch (action.type) {
  case types.GET_ALL_ITEMS:
    return {
      ...state,
      firebaseItems: action.payloadItems,
    };

  case types.GET_SINGLE_ITEMS:
    return {
      ...state,
      singleItem: action.payloadItem,
    };

  case types.ADD_ITEM:
    return {
      ...state,
    };

  case types.DELETE_ITEM:
    return {
      ...state,
    };

  case types.EDIT_ITEM:
    return {
      ...state,
    };

  default:
    return {
      ...state,
    };
  }
};
