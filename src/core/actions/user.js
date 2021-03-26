import lockr from "lockr";

const loginRequested = () => {
  return {
    type: "FETCH_LOGIN_REQUEST",
  };
};

const loginLoaded = (newBooks) => {
  return {
    type: "FETCH_LOGIN_SUCCESS",
    payload: newBooks,
  };
};

const loginError = (error) => {
  return {
    type: "FETCH_LOGIN_FAILURE",
    payload: error,
  };
};

export { loginRequested, loginLoaded, loginError };
