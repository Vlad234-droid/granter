import React from 'react';
import actions from '../actions';
import lockr from 'lockr';
import { bindActionCreators } from 'redux';
import { notification } from 'antd';

import { fetchUserData } from './userServices';
import store from '../../store';

import { IconWarning } from '../../components/icons';

const { REACT_APP_API_URL } = process.env;

const { dispatch } = store;

const fetchLogin = (dispatch, loginData, history) => {
  const { loginLoaded, setUserIsAdmin } = bindActionCreators(actions, dispatch);
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(loginData),
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
        lockr.rm('current-company-id');
        const authDate = new Date();
        lockr.set('auth-key', data.data.token);
        lockr.set('session-token-expiry', authDate);
        loginLoaded(true);
        fetchUserData(dispatch).then((data) => {
          if (data.role_id === 1) {
            setUserIsAdmin();
            history.push('/admin/clients');
            resolve(data.data);
          }
          if (data.role_id === 2) {
            history.push('/active-claims/');
            resolve(data.data);
          }
          if (!data.profile?.id_status) {
            history.push('/docSign');
            resolve(data.data);
          }
        });
      })
      .catch(() => {
        reject();
      });
  });
};

export { fetchLogin };
