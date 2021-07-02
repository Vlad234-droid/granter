import React from 'react';
import actions from '../actions';
import lockr from 'lockr';
import { bindActionCreators } from 'redux';
import { notification } from 'antd';

import { IconWarning } from '../../components/icons';

const { REACT_APP_API_URL } = process.env;

const fetchUserData = (dispatch) => {
  const { loginRequested, userDataLoaded, loginError, setUserIsAdmin } = bindActionCreators(actions, dispatch);
  const token = lockr.get('auth-key');
  loginRequested();
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            loginError(json.message);
            if (resp.status !== 401) {
              notification.error({
                className: 'error-message',
                description: json.message,
                icon: <IconWarning />,
              });
            }
            throw new Error(json);
          });
        }
      })
      .then((data) => {
        if (data.data.role_id === 1) setUserIsAdmin();
        userDataLoaded(data.data);
        resolve(data.data);
      })
      .catch(reject);
  });
};

const fetchUserCompanies = (dispatch) => {
  const { loginRequested, userCompaniesLoaded, loginError } = bindActionCreators(actions, dispatch);
  const token = lockr.get('auth-key');
  loginRequested();
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/core/companies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            loginError(json.message);
            if (resp.status !== 401) {
              notification.error({
                className: 'error-message',
                description: json.message,
                icon: <IconWarning />,
              });
            }
            throw new Error(json);
          });
        }
      })
      .then((data) => {
        resolve(data.data);
        userCompaniesLoaded(data.data);
      })
      .catch(reject);
  });
};

const fetchResetPassword = (email) => {
  const token = lockr.get('auth-key');
  const formData = new FormData();
  formData.append('email', email);

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/password/forgot`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            // notification.error({
            //   className: 'error-message',
            //   description: json.message,
            //   icon: <IconWarning />,
            // });
            throw new Error(json);
          });
        }
      })
      .then((data) => {
        resolve(data.data);
        //userDataLoaded(data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const fetchCreatePassword = (form) => {
  const token = lockr.get('auth-key');

  const formData = new FormData();
  for (let i in form) {
    formData.append(i, form[i]);
  }

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/password/forgot`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((json) => {
            notification.error({
              className: 'error-message',
              description: json.message,
              icon: <IconWarning />,
            });
            throw new Error(json);
          });
        }
      })
      .then((data) => {
        resolve(data.data);
        //userDataLoaded(data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { fetchUserData, fetchUserCompanies, fetchResetPassword, fetchCreatePassword };
