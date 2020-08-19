import { all, takeLatest } from "redux-saga/effects";
import {
  POSTING_SIGNUP,
  POSTING_SIGNIN,
  GETTING_TYPES,
  GETTING_BOOKINGS,
  ADDING_BOOKING,
  CHANGING_STATUS,
  CANCEL_BOOKING,
} from "./types";
import { authSaga } from "./authSaga";
import { bookingSaga } from "./bookingSaga";

function* rootSaga() {
  yield all([
    takeLatest(POSTING_SIGNIN, authSaga.login),
    takeLatest(POSTING_SIGNUP, authSaga.register),
    takeLatest(GETTING_TYPES, bookingSaga.getTypes),
    takeLatest(GETTING_BOOKINGS, bookingSaga.getBookings),
    takeLatest(ADDING_BOOKING, bookingSaga.addBooking),
    takeLatest(CHANGING_STATUS, bookingSaga.changeStatus),
    takeLatest(CANCEL_BOOKING, bookingSaga.cancelBooking),
  ]);
}

export default rootSaga;
