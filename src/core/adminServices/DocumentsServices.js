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

const getDocument = async (claimId, documentId) => {
  try {
    const data = await getResource(`admin/documents/comments/${claimId}/${documentId}`);
    return data.data;
  } catch (err) {
    return null;
  }
};

const approveComment = async (commentId) => {
  try {
    const data = await postResource(`admin/documents/comment/approve/${commentId}`);
    return data.data;
  } catch (err) {
    return null;
  }
};

const postNewComment = async (claimId, id, text, is_reply, comment_id) => {
  const formData = new FormData();
  formData.append('text', text);
  formData.append('page', 1);
  if (is_reply) {
    formData.append('is_reply', is_reply);
    formData.append('comment_id', comment_id);
  }
  try {
    const data = await postResource(`admin/documents/comment/${claimId}/${id}`, formData);
    return data.data;
  } catch (err) {
    return null;
  }
};

const removeComment = async (claimId, documentId, commentId) => {
  try {
    const data = await deleteResource(`admin/documents/comments/${claimId}/${documentId}/${commentId}`);
    return data.data;
  } catch (err) {
    return null;
  }
};

const setSkipFile = async (claimId, documentId) => {
  try {
    const data = await postResource(`admin/documents/skip/${claimId}/${documentId}`);
    return data.data;
  } catch (err) {
    return null;
  }
};

export { getDocument, approveComment, postNewComment, removeComment, setSkipFile };
