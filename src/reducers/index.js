import { combineReducers } from "redux";

const INITIAL_STATE = {
  isSignedIn: "unknown",
  userId: "",
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isSignedIn: "connected", userId: action.payload };
    case "SIGN_OUT":
      return { ...state, isSignedIn: "unknown", userId: "null" };
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
});
