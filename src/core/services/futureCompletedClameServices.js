import React from 'react';
import lockr from 'lockr';
import { notification } from 'antd';
import { IconWarning } from '../../components/icons';
const { REACT_APP_API_URL } = process.env;

const getfutureClaimData = (companyId) => {
  const token = lockr.get('auth-key');
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/claims/future/${companyId}`, {
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
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getCompletedClaimData = (companyId) => {
  const token = lockr.get('auth-key');
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/claims/completed/${companyId}`, {
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
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getfutureClaimData, getCompletedClaimData };
