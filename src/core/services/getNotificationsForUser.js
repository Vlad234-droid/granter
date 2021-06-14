import React from 'react';
import lockr from 'lockr';
import { notification } from 'antd';
import { bindActionCreators } from 'redux';

import actions from '../actions';

import { IconWarning } from '../../components/icons';
const { REACT_APP_API_URL } = process.env;

export const getNotificationsForUser = (dispatch, companyId, history) => {
  const token = lockr.get('auth-key');

  const { userLogOut } = bindActionCreators(actions, dispatch);

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/core/notifications/${companyId}`, {
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
            if (resp.status == 401) {
              notification.error({
                className: 'error-message',
                description: 'Your session has expired, please login again',
                icon: <IconWarning />,
              });
              userLogOut();
              history.push('/sign-in/');
            }
            throw new Error(resp);
          });
        }
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// export const getNotificationsForUser = async (dispatch, companyId) => {
//   const token = lockr.get('auth-key');
//   try {
//     const getUserInfo = await fetch(`${REACT_APP_API_URL}/core/notifications/${companyId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await getUserInfo.json();
//     return data.data;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
