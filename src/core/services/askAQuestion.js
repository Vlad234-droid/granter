import lockr from 'lockr';
const { REACT_APP_API_URL } = process.env;

export const askAQuestion = async (manager_id, activeClaimId, text, phone) => {
  const token = lockr.get('auth-key');
  const body = {
    manager_id,
    activeClaimId,
    text,
  };

  if (!!phone) {
    body.phone = phone;
    body.is_phone = 1;
  } else {
    body.is_phone = 0;
  }

  try {
    const res = await fetch(`${REACT_APP_API_URL}/claims/help-mail`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const resData = await res.json();
    if (resData.success) return res;
  } catch (error) {
    throw new Error(error);
  }
};
