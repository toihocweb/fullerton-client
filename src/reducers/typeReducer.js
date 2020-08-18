import { GET_TYPES } from "../saga/types";
const initialState = {
  types: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TYPES:
      return {
        ...state,
        types: action.data,
      };
    default:
      return state;
  }
};

export default authReducer;
