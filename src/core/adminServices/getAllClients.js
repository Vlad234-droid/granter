import lockr from 'lockr';
const { REACT_APP_API_URL } = process.env;

export const searchService = async () => {
  const token = lockr.get('auth-key');
  const formData = new FormData();
  formData.append('page', 20);
  try {
    const adminGetClients = await fetch(`${REACT_APP_API_URL}/admin/clients`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const res = await adminGetClients.json();
    if (res.success) return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
