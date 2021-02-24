import { combineReducers } from "redux";

const INITIAL_STATE = {
  isSignedIn: "unknown",
  userId: "",
  dir: "RIGHT",
  userName: "",
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, userName: `Welcome ${action.payload}` };
    case "SIGN_IN":
      return { ...state, isSignedIn: "connected", userId: action.payload };
    case "SIGN_OUT":
      return { ...state, isSignedIn: "unknown", userId: "null" };
    case "UP":
      return { ...state, dir: "UP" };
    case "DOWN":
      return { ...state, dir: "DOWN" };
    case "RIGHT":
      return { ...state, dir: "RIGHT" };
    case "LEFT":
      return { ...state, dir: "LEFT" };
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
});
