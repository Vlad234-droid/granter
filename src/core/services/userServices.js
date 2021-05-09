import React from "react";
import actions from "../actions";
import lockr from "lockr";
import { bindActionCreators } from "redux";
import { notification } from "antd";

import { IconWarning } from "../../components/icons";

const { REACT_APP_API_URL } = process.env;

const fetchUserData = (dispatch) => {
  const { loginRequested, userDataLoaded, loginError } = bindActionCreators(
    actions,
    dispatch
  );
  const token = lockr.get("auth-key");
  loginRequested();
  fetch(`${REACT_APP_API_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.json().then((json) => {
          loginError(json.message);
          notification.error({
            className: "error-message",
            description: json.message,
            icon: <IconWarning />,
          });
          throw new Error(json);
        });
      }
    })
    .then((data) => {
      console.log(data);
      userDataLoaded(data.data);
    });
};

const fetchUserCompanies = (dispatch) => {
  const {
    loginRequested,
    userCompaniesLoaded,
    loginError,
  } = bindActionCreators(actions, dispatch);
  const token = lockr.get("auth-key");
  loginRequested();
  fetch(`${REACT_APP_API_URL}/core/companies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.json().then((json) => {
          loginError(json.message);
          notification.error({
            className: "error-message",
            description: json.message,
            icon: <IconWarning />,
          });
          throw new Error(json);
        });
      }
    })
    .then((data) => {
      userCompaniesLoaded(data.data);
    });
};

const fetchProfileData = () => {
  const token = lockr.get("auth-key");
  fetch(`${REACT_APP_API_URL}/profile/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.json().then((json) => {
          notification.error({
            className: "error-message",
            description: json.message,
            icon: <IconWarning />,
          });
          throw new Error(json);
        });
      }
    })
    .then((data) => {
      console.log(data);
    });
};

export { fetchUserData, fetchUserCompanies, fetchProfileData };
