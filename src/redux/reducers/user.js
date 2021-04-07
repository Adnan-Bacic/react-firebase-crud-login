import * as types from '../types';

const defaultState = {
  userData: null,
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
  case types.SET_USER:
    return {
      ...state,
      userData: action.payloadUserData,
    };

  case types.REGISTER_USER:
    return {
      ...state,
    };

  case types.LOGIN_USER:
    return {
      ...state,
    };

  case types.SIGNOUT_USER:
    return {
      ...state,
      userData: null,
    };

  default:
    return {
      ...state,
    };
  }
};
