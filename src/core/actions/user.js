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

const userDataLoaded = (data) => {
  return {
    type: "FETCH_USER_DATA_SUCCESS",
    payload: data,
  };
};

const userCompaniesLoaded = (data) => {
  return {
    type: "FETCH_USER_COMPANIES_SUCCESS",
    payload: data,
  };
};

const setUserActiveClimeId = (data) => {
  return {
    type: "SET-USER-ACTIVE-CLIME-ID",
    payload: data,
  };
};

export {
  loginRequested,
  loginLoaded,
  loginError,
  userDataLoaded,
  userCompaniesLoaded,
  setUserActiveClimeId,
};
