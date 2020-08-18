import { put, all, takeLatest, delay, select } from "redux-saga/effects";
import {
  SIGN_IN,
  SIGN_UP,
  SET_CURRENT_USER,
  SET_ERROR,
  GET_TYPES,
  GET_BOOKINGS,
  ADD_BOOKING,
  SET_LOADING_BOOKING,
  CHANGE_STATUS,
} from "./types";
import Axios from "axios";
import { api } from "../utils/api";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

const getTypesApi = async () => {
  const res = await Axios.get(`${api}/bookings/types`);
  return res.data;
};

const getBookingsApi = async (userId) => {
  const res = await Axios.get(`${api}/bookings/user/${userId}`);
  return res.data;
};

const addBookingApi = async (data) => {
  const res = await Axios.post(`${api}/bookings/new`, data);
  return res.data;
};

const changeStatusApi = async (bookingId, data, status) => {
  const res = await Axios.post(
    `${api}/bookings/status/${status}/${bookingId}`,
    { data }
  );
  return res.data;
};
const cancelBookingApi = async (bookingId) => {
  const res = await Axios.delete(`${api}/bookings/${bookingId}`);
  return res.data;
};

function* setLoading(status = true) {
  yield put({ type: SET_LOADING_BOOKING, data: status });
}

function* getTypes(action) {
  try {
    const data = yield getTypesApi();
    console.log(data);
    yield put({ type: GET_TYPES, data });
  } catch (error) {}
}
const getUserId = (state) => state.authReducer.currentUser.id;

function* getBookings(action) {
  try {
    yield setLoading(true);
    const userId = yield select(getUserId);
    console.log(userId);
    const data = yield getBookingsApi(userId);
    yield put({ type: GET_BOOKINGS, data });
    yield delay(1000);
    yield setLoading(false);
  } catch (error) {}
}

function* addBooking(action) {
  try {
    yield setLoading(true);
    const data = yield addBookingApi(action.booking);
    yield* getBookings();
    yield* put({ type: ADD_BOOKING, data });
  } catch (error) {}
}

function* changeStatus(action) {
  try {
    const data = yield changeStatusApi(
      action.bookingId,
      action.data,
      action.status
    );
    yield* getBookings();
  } catch (error) {
    throw new Error(error);
  }
}

function* cancelBooking(action) {
  try {
    const data = yield cancelBookingApi(action.bookingId);
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
