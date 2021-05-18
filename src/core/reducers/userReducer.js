import React from 'react';
import lockr from 'lockr';
import { notification } from 'antd';
import { IconWarning } from '../../components/icons';

const { LOCALSTORAGE_EXPIRES_TIME } = require('../constants').default;

const onlyAuthorisedAllowed = () => {
  const response = lockr.get('auth-key');
  if (response) {
    const authDate = lockr.get('session-token-expiry');
    if (authDate) {
      const aDate = new Date(authDate);
      const aNow = new Date();
      const milliseconds = aNow - aDate;
      const difference = Math.floor(milliseconds / 1000 / 60);
      if (difference >= LOCALSTORAGE_EXPIRES_TIME) {
        notification.error({
          className: 'error-message',
          description: 'Session expired. Please login again.',
          icon: <IconWarning />,
        });
        lockr.flush();
        return false;
      }
    } else {
      notification.error({
        className: 'error-message',
        description: 'Session expired. Please login again.',
        icon: <IconWarning />,
      });
      return false;
    }
    return true;
  }
  return false;
};

const initialState = {
  isloggedIn: onlyAuthorisedAllowed(),
  data: null,
  companies: null,
  currentCompany: null,
  activeClaimId: null,
  loader: false,
  error: null,
  success: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LOGIN_REQUEST':
      return {
        ...state,
        //isloggedIn: false,
        loader: true,
        error: null,
        success: false,
      };

    case 'FETCH_LOGIN_SUCCESS':
      return {
        ...state,
        isloggedIn: action.payload,
        loader: false,
        error: null,
        success: true,
      };

    case 'FETCH_LOGIN_FAILURE':
      return {
        ...state,
        isloggedIn: false,
        loader: false,
        error: action.payload,
        success: false,
      };

    case 'FETCH_USER_DATA_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loader: false,
        error: null,
        success: true,
      };

    case 'FETCH_USER_COMPANIES_SUCCESS':
      return {
        ...state,
        companies: action.payload,
        // currentCompany: action.payload[0],
        loader: false,
        error: null,
        success: true,
      };

    case 'SET-USER-ACTIVE-CLIME-ID':
      return {
        ...state,
        activeClaimId: action.payload,
        loader: false,
        error: null,
        success: true,
      };

    case 'SET_USER_CURRENT_COMPANY':
      return {
        ...state,
        currentCompany: action.payload,
      };

    case 'USER-LOG-OUT':
      return {
        isloggedIn: false,
        data: null,
        companies: null,
        currentCompany: null,
        activeClaimId: null,
        loader: false,
        error: null,
        success: false,
      };

    default:
      return state;
  }
};

export default userReducer;
