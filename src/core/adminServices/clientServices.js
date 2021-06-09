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

const deleteResource = async (url) => {
  const token = lockr.get('auth-key');
  const res = await fetch(`${REACT_APP_API_URL}/${url}`, {
    method: 'DELETE',
    headers: {
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

const getAllClients = async (page, sort_by, sort_dir) => {
  const body = new FormData();
  body.append('page', page);
  if (sort_by !== undefined && sort_dir !== undefined) {
    body.append('sort_by', sort_by);
    body.append('sort_dir', sort_dir.slice(0, -3));
  }
  try {
    const data = await postResource(`admin/clients`, body);
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

const postEditClient = async (clientID, form) => {
  const formData = new FormData();
  for (let i in form) {
    formData.append(i, form[i]);
  }
  try {
    const data = await postResource(`admin/client/edit/${clientID}`, formData);
    return data.data;
  } catch (err) {
    return null;
  }
};

const deleteClient = async (clientID) => {
  try {
    const data = await deleteResource(`admin/client/${clientID}`);
    return data.data;
  } catch (err) {
    return null;
  }
};

const postCompanyLogo = async (companyId, logo) => {
  const formData = new FormData();
  formData.append('logo', logo);
  try {
    const data = await postResource(`admin/company/upload-logo/${companyId}`, formData);
    return data.data;
  } catch (err) {
    return null;
  }
};

const deleteComany = async (companyId, clientId) => {
  try {
    const data = await deleteResource(`admin/company/delete/${companyId}/${clientId}`);
    return data.data;
  } catch (err) {
    return null;
  }
};

const addNewCompany = async (clientId, company) => {
  const formData = new FormData();
  for (let i in company) {
    if (i === 'industry_ids') {
      company[i].forEach((el, n) => {
        formData.append('industry_ids[' + n + ']', el.id);
      });
    } else {
      formData.append(i, company[i]);
    }
  }
  try {
    const data = await postResource(`admin/company/add/${clientId}`, formData);
    return data.data;
  } catch (err) {
    return null;
  }
};

export {
  getClient,
  getClientCompanies,
  getClientActions,
  postClientCompanyEdits,
  getAllClients,
  postEditClient,
  deleteClient,
  postCompanyLogo,
  deleteComany,
  addNewCompany,
};
