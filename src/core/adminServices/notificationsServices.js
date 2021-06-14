import lockr from 'lockr';
const { REACT_APP_API_URL } = process.env;

export const getNotificationsForAdmin = async () => {
  const token = lockr.get('auth-key');
  try {
    const getAdminInfo = await fetch(`${REACT_APP_API_URL}/admin/notifications`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await getAdminInfo.json();
    return data.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const readAdminNoti = async () => {
  const token = lockr.get('auth-key');
  try {
    const readAdminNoti = await fetch(`${REACT_APP_API_URL}/admin/notifications/set-read`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await readAdminNoti.json();
    if (res.success) return res;
  } catch (error) {
    throw new Error(error);
  }
};
