import lockr from 'lockr';

import { bindActionCreators } from 'redux';

import actions from '../../core/actions';

const { REACT_APP_API_URL } = process.env;

export const logOut = async (dispatch) => {
  try {
    const { userLogOut, registrationChangeEstimate } = bindActionCreators(actions, dispatch);
    const token = lockr.get('auth-key');
    const data = await fetch(`${REACT_APP_API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.status === 200) {
      registrationChangeEstimate(null);
      userLogOut();
    }
  } catch (error) {
    throw new Error(error);
  } finally {
    lockr.rm('auth-key');
    lockr.rm('session-token-expiry');
    lockr.rm('current-company-id');
  }
};
