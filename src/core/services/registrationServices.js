import React from 'react';
import actions from '../actions';
import { bindActionCreators } from 'redux';
import { notification } from 'antd';

import { IconWarning } from '../../components/icons';

const { REACT_APP_API_URL } = process.env;

const fetchCompanyHouse = (q) => {
  let body = {
    q: q,
  };

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/core/find-company`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
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
      });
  });
};

const fetchRegistration = (form) => {
  let body = form;
  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
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
      })
      .catch(() => {
        reject();
      });
  });
};

const fetchAllIndustries = (dispatch) => {
  const { registrationSetAllIndustries } = bindActionCreators(actions, dispatch);

  fetch(`${REACT_APP_API_URL}/core/industries`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
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
      const res = data.data.map((item, index) => {
        item.value = item.display_value;
        item.key = `ind-${index}`;
        return item;
      });
      registrationSetAllIndustries(res);
    });
};

export { fetchCompanyHouse, fetchAllIndustries, fetchRegistration };
