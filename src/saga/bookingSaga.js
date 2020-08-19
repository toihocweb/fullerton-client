import { put, delay, select } from "redux-saga/effects";
import {
  GET_TYPES,
  GET_BOOKINGS,
  ADD_BOOKING,
  SET_LOADING_BOOKING,
} from "./types";
import Axios from "axios";
import { api } from "../utils/api";

// get types
const getTypesApi = async () => {
  const res = await Axios.get(`${api}/bookings/types`);
  return res.data;
};

// get booking on user
const getBookingsApi = async (userId) => {
  const res = await Axios.get(`${api}/bookings/user/${userId}`);
  return res.data;
};

// add new booking
const addBookingApi = async (data) => {
  const res = await Axios.post(`${api}/bookings/new`, data);
  return res.data;
};

// change status booking includes approve , reject
const changeStatusApi = async (bookingId, data, status) => {
  const res = await Axios.post(
    `${api}/bookings/status/${status}/${bookingId}`,
    { data }
  );
  return res.data;
};

// cancel booking
const cancelBookingApi = async (bookingId) => {
  const res = await Axios.delete(`${api}/bookings/${bookingId}`);
  return res.data;
};

// get loading status
function* setLoading(status = true) {
  yield put({ type: SET_LOADING_BOOKING, data: status });
}

// put types to store
function* getTypes(action) {
  try {
    const data = yield getTypesApi();
    yield put({ type: GET_TYPES, data });
  } catch (error) {}
}

// get user from store
const getUserId = (state) => state.authReducer.currentUser.id;

// set booking to store
function* getBookings(action) {
  try {
    yield setLoading(true);
    const userId = yield select(getUserId);
    const data = yield getBookingsApi(userId);
    yield put({ type: GET_BOOKINGS, data });
    yield delay(1000);
    yield setLoading(false);
  } catch (error) {}
}

// add booking to store
function* addBooking(action) {
  try {
    yield setLoading(true);
    const data = yield addBookingApi(action.booking);
    yield* getBookings();
    yield* put({ type: ADD_BOOKING, data });
  } catch (error) {}
}

// change status and get new bookings
function* changeStatus(action) {
  try {
    yield changeStatusApi(action.bookingId, action.data, action.status);
    yield* getBookings();
  } catch (error) {
    throw new Error(error);
  }
}

// cancel booking and get new bookings
function* cancelBooking(action) {
  try {
    yield cancelBookingApi(action.bookingId);
    yield* getBookings();
  } catch (error) {
    throw new Error(error);
  }
}

export const bookingSaga = {
  getTypes,
  getBookings,
  addBooking,
  changeStatus,
  cancelBooking,
};
