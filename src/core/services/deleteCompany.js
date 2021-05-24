import React from 'react';
import actions from '../actions';
import lockr from 'lockr';
import { notification } from 'antd';

import { IconWarning } from '../../components/icons';

const { REACT_APP_API_URL } = process.env;

export const deleteCompany = async (companyId) => {
  try {
    const token = lockr.get('auth-key');

    const deleteComp = await fetch(`${REACT_APP_API_URL}/profile/delete/company/${companyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await deleteComp.json();
    if (res.success) return res;
  } catch (error) {
    throw new Error(error);
  }
};
