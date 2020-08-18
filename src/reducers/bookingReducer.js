import { GET_BOOKINGS, ADD_BOOKING, SET_LOADING_BOOKING } from "../saga/types";

const initialState = {
  bookings: null,
  isLoading: false,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS:
      return {
        ...state,
        bookings: action.data,
      };
    case ADD_BOOKING:
      return {
        ...state,
        bookings: [...state, action.data],
      };
    case SET_LOADING_BOOKING:
      return {
        ...state,
        isLoading: action.data,
      };
    default:
      return state;
  }
};

export default errorReducer;
