import lockr from 'lockr';
import {notification} from 'antd';

const {REACT_APP_API_URL} = process.env;

export const getNotificationsForUser = async (dispatch, companyId) => {
	const token = lockr.get('auth-key');
	try {
		const getUserInfo = await fetch(
			`${REACT_APP_API_URL}/core/notifications/${companyId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = await getUserInfo.json();
		return data.data;
	} catch (error) {
		throw new Error(error);
	}
};
