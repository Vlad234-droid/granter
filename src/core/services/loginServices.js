import React from 'react';
import actions from '../actions';
import lockr from 'lockr';
import { bindActionCreators } from 'redux';
import { notification } from 'antd';
import { fetchUserData } from './userServices';
import { IconWarning } from '../../components/icons';

const { REACT_APP_API_URL } = process.env;

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
          if (data.role_id === 2 && !data.profile?.id_status) {
            history.push('/docSign');
            resolve(data.data);
          } else if (data.role_id === 2 && data.profile?.id_status) {
            history.push('/active-claims/');
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
