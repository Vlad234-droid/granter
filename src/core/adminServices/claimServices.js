import React from 'react';
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
  try {
    const appDoc = await postResource(`admin/claim/approve/document/${documentId}/${status}`);
    return appDoc;
  } catch (err) {
    return null;
  }
};

const approveStep = async (claimId, stepNumber) => {
  try {
    const appDoc = await postResource(`admin/claim/approve/${claimId}/${stepNumber}`);
    return appDoc.data;
  } catch (err) {
    return null;
  }
};

const uploadDocumentToClaim = async (claimId, documentId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const appDoc = await postResource(`admin/documents/upload/${claimId}/${documentId}`, formData);
    return appDoc.data;
  } catch (err) {
    return null;
  }
};

const deleteDocumentFromClaim = async (claimId, documentId) => {
  try {
    const appDoc = await deleteResource(`admin/documents/delete/${claimId}/${documentId}`);
    return appDoc.data;
  } catch (err) {
    notification.error({
      className: 'error-message',
      description: 'Document has unresolved comments',
      icon: <IconWarning />,
    });
    return null;
  }
};

export {
  getClaim,
  getIntroductionClaimStep,
  getFinancialClaimStep,
  getTechnicalClaimStep,
  approveDocument,
  approveStep,
  deleteDocumentFromClaim,
  uploadDocumentToClaim,
};
