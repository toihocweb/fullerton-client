import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import typeReducer from "./typeReducer";
import bookingReducer from "./bookingReducer";

const rootReducer = combineReducers({
  authReducer,
  errorReducer,
  typeReducer,
  bookingReducer,
});

export default rootReducer;
