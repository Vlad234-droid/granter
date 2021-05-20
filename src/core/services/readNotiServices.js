import lockr from 'lockr';

const { REACT_APP_API_URL } = process.env;

export const readNoti = async (compId) => {
  const token = lockr.get('auth-key');

  try {
    await fetch(`${REACT_APP_API_URL}/core/notification/set-read/${compId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
