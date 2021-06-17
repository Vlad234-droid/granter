import lockr from 'lockr';
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
  const body = await res.json();
  return body;
};

export const createNewAdmin = async (email, name, password, phone, avatar) => {
  const body = new FormData();
  body.append('email', email);
  body.append('name', name);
  body.append('password', password);
  body.append('phone', phone);
  body.append('avatar', avatar);
  try {
    const newAdmin = await postResource(`admin/admin/create`, body);
    return newAdmin;
  } catch (error) {
    return error;
  }
};

export const getAllAdmins = async () => {
  try {
    const allAdmins = await postResource(`admin/get/admins`);
    return allAdmins.data;
  } catch (error) {
    return null;
  }
};

export const deleteAdmin = async (adminId) => {
  const token = lockr.get('auth-key');
  try {
    const delAdmin = await fetch(`${REACT_APP_API_URL}/admin/admin/${adminId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await delAdmin.json();
    return res;
  } catch (error) {
    throw new Error(error);
  }
};
