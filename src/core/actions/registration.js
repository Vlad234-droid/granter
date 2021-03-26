import lockr from "lockr";

const registrationFetchRequested = () => {
  return {
    type: "FETCH_REGISTER_REQUEST",
  };
};

const registrationFetchLoaded = (newBooks) => {
  return {
    type: "FETCH_REGISTER_SUCCESS",
    payload: newBooks,
  };
};

const registrationFetchError = (error) => {
  return {
    type: "FETCH_REGISTER_FAILURE",
    payload: error,
  };
};

const registrationUpdateState = (data) => {
  return {
    type: "FETCH_REGISTER_UPDATE_STATE",
    payload: data,
  };
};

const registrationSetAllIndustries = (data) => {
  return {
    type: "REGISTER_SET_ALL_INDUSTRIES",
    payload: data,
  };
};

export {
  registrationFetchRequested,
  registrationFetchLoaded,
  registrationFetchError,
  registrationUpdateState,
  registrationSetAllIndustries,
};
