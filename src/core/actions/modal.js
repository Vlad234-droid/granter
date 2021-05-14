const showModalAction = () => ({
	type: 'SHOW_MODAL',
});

const closeModalAction = () => ({
	type: 'CLOSE_MODAL',
});

const showModalNotifications = () => ({
	type: 'SHOW_MODAL_NOTIFICATIONS',
});

const closeModalNotifications = () => ({
	type: 'CLOSE_MODAL_NOTIFICATIONS',
});

export {
	showModalAction,
	closeModalAction,
	showModalNotifications,
	closeModalNotifications,
};
