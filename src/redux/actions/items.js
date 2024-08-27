import * as types from '../types';

export const getAllItems = (items) => {
  return {
    type: types.GET_ALL_ITEMS,
    payloadItems: items,
  };
};

export const getSingleItem = (item) => {
  return {
    type: types.GET_SINGLE_ITEMS,
    payloadItem: item,
  };
};

export const addItem = (item) => {
  return {
    type: types.ADD_ITEM,
    payload: item,
  };
};

export const deleteItem = (id) => {
  return {
    type: types.DELETE_ITEM,
    payload: id,
  };
};

export const editItem = (item) => {
  return {
    type: types.EDIT_ITEM,
    payload: item,
  };
};
