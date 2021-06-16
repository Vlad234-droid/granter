import lockr from 'lockr';
import { notification } from 'antd';
const { REACT_APP_API_URL } = process.env;

export const hubspotService = async (link) => {
  const token = lockr.get('auth-key');
  const body = {
    link,
  };
  try {
    const res = await fetch(`${REACT_APP_API_URL}/admin/settings/update-hubspot-link`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const resData = await res.json();
    if (resData.success) {
      return res;
    }
  } catch (error) {
    throw new Error(error);
  }
};
