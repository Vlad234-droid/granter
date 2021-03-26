import React from "react";
import actions from "../actions";
import lockr from "lockr";
import { bindActionCreators } from "redux";
import { notification } from "antd";

import { IconWarning } from "../../components/icons";

const { REACT_APP_API_URL } = process.env;

const fetchLogin = (dispatch, loginData) => {
  console.log(loginData);

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(loginData),
    })
      .then((resp) => {
        console.log(resp);
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
        resolve(data.data);
        //console.log(data);
        // const authDate = new Date();
        // lockr.set("auth-key", data.data.token);
        // lockr.set("session-token-expiry", authDate);
      })
      .catch(() => {
        reject();
      });
  });
};

export { fetchLogin };
