import React from 'react';

export const initialState = {
	visibleModal: false,
	isVisibleNotifications: false,
};

export const modalReducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case 'SHOW_MODAL':
			return {
				...state,
				visibleModal: true,
			};
		case 'CLOSE_MODAL':
			return {
				...state,
				visibleModal: false,
			};
		case 'SHOW_MODAL_NOTIFICATIONS':
			return {
				...state,
				isVisibleNotifications: true,
			};
		case 'CLOSE_MODAL_NOTIFICATIONS':
			return {
				...state,
				isVisibleNotifications: false,
			};
		default:
			return {
				...state,
			};
	}
};

export default modalReducer;
