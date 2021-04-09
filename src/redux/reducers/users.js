import * as types from '../types';

const defaultState = {
  itemsByUser: null,
  usersList: null,
};

export const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
  case types.GET_ALL_ITEMS_BY_USER:
    return {
      ...state,
      itemsByUser: action.payloadItems,
    };

  case types.GET_ALL_USERS:
    return {
      ...state,
      usersList: action.payloadUsers,
    };

  default:
    return {
      ...state,
    };
  }
};
