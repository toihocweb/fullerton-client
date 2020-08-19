import {
  POSTING_SIGNIN,
  CLEAR_ERROR,
  POSTING_SIGNUP,
  SET_CURRENT_USER,
} from "../saga/types";

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};

export const loginAction = (data, history) => {
  return {
    type: POSTING_SIGNIN,
    data,
    history,
  };
};

export const registerAction = (data, history) => {
  return {
    type: POSTING_SIGNUP,
    data,
    history,
  };
};

export const setCurrentUser = (data) => {
  return {
    type: SET_CURRENT_USER,
    data,
  };
};

export const logoutUser = () => {
  return {
    type: SET_CURRENT_USER,
    data: null,
  };
};
