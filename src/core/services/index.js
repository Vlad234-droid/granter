import React from "react";
import { bindActionCreators } from "redux";
import { notification } from "antd";
import lockr from "lockr";
import actions from "../actions";
import { IconWarning } from "../../components/icons";

// const fetchLogin = (dispatch) => (loginData, history) => {
//   let body = {
//     email: loginData.email,
//     password: loginData.password,
//     remember_me: true,
//   };

//   const { loginRequested, loginLoaded, loginError } = bindActionCreators(
//     actions,
//     dispatch
//   );

//   loginRequested();
//   fetch(`${REACT_APP_API_URL}/api/user/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       //Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(body),
//   })
//     .then((resp) => {
//       if (resp.ok) {
//         return resp.json();
//       } else {
//         return resp.json().then((json) => {
//           loginError(json.message);
//           notification.error({
//             className: "error-message",
//             description: json.message,
//             icon: <IconWarning />,
//           });
//           throw new Error(json);
//         });
//       }
//     })
//     .then((data) => {
//       loginLoaded(true);
//       const authDate = new Date();
//       lockr.set("auth-key", data.data.token);
//       lockr.set("session-token-expiry", authDate);
//       history.push("/how-to-start/");
//     });
// };

export * from "./registrationServices";
export * from "./loginServices";
export * from "./userServices";
export * from "./activeClameServices";
export * from "./futureCompletedClameServices.js";
export * from "./documentsServices.js";
export * from "./ProfileServices.js";
