export const signIn = (userId) => {
  return {
    type: "SIGN_IN",
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const movement = (val) => {
  return {
    type: val,
  };
};
export const setUserName = (username) => {
  return {
    type: "SET_USERNAME",
    payload: username,
  };
};
