import { SET_CURRENT_USER } from "../saga/types";
const initialState = {
  currentUser: null,
  isAdmin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.data,
        isAdmin: action.data.role === "admin" ? true : false,
      };

    default:
      return state;
  }
};

export default authReducer;
