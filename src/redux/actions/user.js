import * as types from '../types';

export const setUserData = (userData) => {
  return {
    type: types.SET_USER,
    payloadUserData: userData,
  };
};

export const registerUser = () => {
  return {
    type: types.REGISTER_USER,
  };
};

export const loginUser = () => {
  return {
    type: types.LOGIN_USER,
  };
};

export const signOutUser = () => {
  return {
    type: types.SIGNOUT_USER,
  };
};
