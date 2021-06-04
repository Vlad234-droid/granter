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

const getClaim = async (claimId) => {
  try {
    const data = await postResource(`admin/claim/get/${claimId}`);
    return data.data;
  } catch (err) {
    return null;
  }
};

const getIntroductionClaimStep = async (claimId) => {
  try {
    const intro = await getResource(`admin/claim/stage/introduction/${claimId}`);
    return intro.data;
  } catch (err) {
    return null;
  }
};
const getFinancialClaimStep = async (claimId) => {
  try {
    const intro = await getResource(`admin/claim/stage/financial/${claimId}`);
    return intro.data;
  } catch (err) {
    return null;
  }
};

const getTechnicalClaimStep = async (claimId) => {
  try {
    const intro = await getResource(`admin/claim/stage/technical/${claimId}`);
    return intro.data;
  } catch (err) {
    return null;
  }
};

const approveDocument = async (documentId, status) => {
  const token = lockr.get('auth-key');

  try {
    const appDoc = await fetch(`${REACT_APP_API_URL}/admin/claim/approve/document/${documentId}/${status}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!appDoc.ok) throw new Error();
    const res = await appDoc.json();
    console.log(res);
  } catch (err) {
    return err;
  }
};

export { getClaim, getIntroductionClaimStep, getFinancialClaimStep, getTechnicalClaimStep, approveDocument };
