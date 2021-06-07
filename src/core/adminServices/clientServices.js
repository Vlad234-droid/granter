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

const postResource = async (url, dataBody) => {
  dataBody = dataBody || new FormData();
  const token = lockr.get('auth-key');
  const res = await fetch(`${REACT_APP_API_URL}/${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: dataBody,
  });
  if (!res.ok) {
    throw new Error();
  }
  const body = await res.json();
  return body;
};

const getAllClients = async (page) => {
  const body = new FormData();
  body.append('page', page);
  try {
    const data = await postResource(`admin/clients`, page);
    return data.data;
  } catch (err) {
    return null;
  }
};

const postClientCompanyEdits = async (companyId, form) => {
  console.log('form', form);
  const body = new FormData();
  for (let i in form) {
    body.append(i, form[i]);
  }

  try {
    const data = await postResource(`admin/company/edit/${companyId}`, body);
    return data.data;
  } catch (err) {
    return null;
  }
};

const getClient = async (clientID) => {
  try {
    const data = await getResource(`admin/client/${clientID}`);
    return data.data;
  } catch (err) {
    return null;
  }
};

const getClientCompanies = async (clientID) => {
  try {
    const data = await getResource(`admin/client/companies/${clientID}`);
    return data.data;
  } catch (err) {
    return null;
  }
};

const getClientActions = async (clientID) => {
  try {
    const data = await getResource(`admin/client/logs/${clientID}`);
    return data.data;
  } catch (err) {
    return null;
  }
};

export { getClient, getClientCompanies, getClientActions, postClientCompanyEdits, getAllClients };
