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
      firebaseItems: [...state.firebaseItems, action.payload],
    };

  case types.DELETE_ITEM:
    return {
      ...state,
      firebaseItems: state.firebaseItems.filter((item) => { return item.id !== action.payload; }),
    };

  case types.EDIT_ITEM:
    return {
      ...state,
      singleItem: {
        ...state.singleItem,
        title: action.payload.title,
        subtitle: action.payload.subtitle,
        body: action.payload.body,
      },
    };

  default:
    return {
      ...state,
    };
  }
};
