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

export const addItem = () => {
  return {
    type: types.ADD_ITEM,
  };
};

export const deleteItem = () => {
  return {
    type: types.DELETE_ITEM,
  };
};

export const editItem = () => {
  return {
    type: types.EDIT_ITEM,
  };
};
