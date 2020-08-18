import {
  POSTING_SIGNIN,
  CLEAR_ERROR,
  POSTING_SIGNUP,
  SET_CURRENT_USER,
  GET_TYPES,
  GETTING_TYPES,
  GETTING_BOOKINGS,
  ADDING_BOOKING,
  SET_LOADING_BOOKING,
  CHANGING_STATUS,
  REJECT_STATUS,
  CANCEL_BOOKING,
} from "../saga/types";

export const getTypes = () => {
  return {
    type: GETTING_TYPES,
  };
};

export const getBookings = () => {
  return {
    type: GETTING_BOOKINGS,
  };
};

export const addBooking = (booking) => {
  return {
    type: ADDING_BOOKING,
    booking,
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING_BOOKING,
  };
};

export const changeStatus = (bookingId, data, status) => {
  return {
    type: CHANGING_STATUS,
    status,
    bookingId,
    data,
  };
};
export const cancelBooking = (bookingId) => {
  return {
    type: CANCEL_BOOKING,
    bookingId,
  };
};
