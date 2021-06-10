import lockr from 'lockr';
const { REACT_APP_API_URL } = process.env;

export const askAQuestion = async (manager_id, text, is_phone) => {
  const token = lockr.get('auth-key');
  const formData = new FormData();
  formData.append('manager_id', manager_id);
  formData.append('text', text);
  formData.append('is_phone', is_phone);
  try {
    const res = await fetch(`${REACT_APP_API_URL}/claims/help-mail`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const resData = await res.json();
    if (resData.success) return res;
  } catch (error) {
    throw new Error(error);
  }
};
