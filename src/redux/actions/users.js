import * as types from '../types';

export const getAllItemsByUser = (items) => {
  return {
    type: types.GET_ALL_ITEMS_BY_USER,
    payloadItems: items,
  };
};

export const getAllUsers = (users) => {
  return {
    type: types.GET_ALL_USERS,
    payloadUsers: users,
  };
};
