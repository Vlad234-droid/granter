import lockr from 'lockr';
const { REACT_APP_API_URL } = process.env;

export const createNewAdmin = async (email, name, password, phone) => {
  const token = lockr.get('auth-key');
  const formData = new FormData();
  formData.append('email', email);
  formData.append('name', name);
  formData.append('password', password);
  formData.append('phone', phone);
  try {
    const newAdmin = await fetch(`${REACT_APP_API_URL}/admin/admin/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const res = await newAdmin.json();
    console.log(res);
    if (res.success) return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAdmin = async (adminId) => {
  const token = lockr.get('auth-key');

  try {
    const delAdmin = await fetch(`${REACT_APP_API_URL}/admin/admin/${adminId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await delAdmin.json();
    console.log(res);
    if (res.success) return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
