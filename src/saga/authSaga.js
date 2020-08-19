import { put } from "redux-saga/effects";
import { SET_CURRENT_USER, SET_ERROR } from "./types";
import Axios from "axios";
import { api } from "../utils/api";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// login api
const loginApi = async (user) => {
  const res = await Axios.post(`${api}/auth/login`, user);
  return res.data.token;
};

// register api
const registerApi = async (user) => {
  const res = await Axios.post(`${api}/auth/register`, user);
  return res.data;
};

// set current user
function* setCurrentUser(token) {
  try {
    // Save to localStorage
    localStorage.setItem("jwtToken", token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    yield put({ type: SET_CURRENT_USER, data: decoded });
  } catch (error) {
    yield setError(error.response.data);
  }
}

// set error
function* setError(error) {
  yield put({ type: SET_ERROR, data: error });
}

// login
function* login(action) {
  try {
    const token = yield loginApi(action.data);
    yield setCurrentUser(token);
    action.history.push("/");
  } catch (error) {
    yield setError(error.response.data);
  }
}

// register
function* register(action) {
  try {
    yield registerApi(action.data);
    action.history.push("/login");
  } catch (error) {
    yield setError(error.response.data);
  }
}

export const authSaga = {
  login,
  register,
};
