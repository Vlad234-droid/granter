import React from 'react';

export const initialState = {
	visibleModal: false,
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
		default:
			return {
				...state,
			};
	}
};

export default modalReducer;
