import lockr from 'lockr';
import { notification } from 'antd';

import { IconWarning } from '../../components/icons';
const { REACT_APP_API_URL } = process.env;

const getResource = async (url) => {
  const token = lockr.get('auth-key');
  const res = await fetch(`${REACT_APP_API_URL}/${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error();
  }
  const body = await res.json();
  return body;
};

const getClient = async (clientID) => {
  try {
    const data = await getResource(`admin/client/${clientID}`);
    return data.data;
  } catch (err) {
    throw new Error();
  }
};

export { getClient };
