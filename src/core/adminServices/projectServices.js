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

const setNewProject = async (claimId, form) => {
  const formData = new FormData();
  for (let i in form) {
    if (i === 'documents') {
      form[i].forEach((doc, index) => {
        formData.append(`${i}[${index}]`, doc);
      });
    } else {
      if (form[i]) formData.append(i, form[i]);
    }
  }
  try {
    const data = await postResource(`admin/project/add/${claimId}`, formData);
    return data.data;
  } catch (err) {
    return null;
  }
};

const addDocumentToProject = async (claimId, projectId, file, is_main) => {
  const formData = new FormData();
  formData.append('document', file);
  if (is_main) formData.append('is_main', is_main);

  try {
    const data = await postResource(`admin/project/add/document/${claimId}/${projectId}`, formData);
    return data.data;
  } catch (err) {
    return null;
  }
};

const editProject = async (claimId, projectId, form) => {
  const formData = new FormData();
  for (let i in form) {
    if (form[i]) formData.append(i, form[i]);
  }

  try {
    const data = await postResource(`admin/project/edit/${claimId}/${projectId}`, formData);
    return data.data;
  } catch (err) {
    return null;
  }
};

const removeDocumentFromProject = async (claimId, projectId, documentId) => {
  try {
    const data = await deleteResource(`admin/project/delete/document/${claimId}/${projectId}/${documentId}`);
    return data.data;
  } catch (err) {
    return null;
  }
};

const removeProject = async (claimId, projectId) => {
  try {
    const data = await deleteResource(`admin/project/delete/${claimId}/${projectId}`);
    return data.data;
  } catch (err) {
    return null;
  }
};

const approveProject = async (projectId, status) => {
  try {
    const data = await postResource(`admin/claim/approve/project/${projectId}/${status}`);
    return data.data;
  } catch (err) {
    return null;
  }
};

export { setNewProject, addDocumentToProject, editProject, removeDocumentFromProject, removeProject, approveProject };
