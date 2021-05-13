const showModalAction = () => {
	return {
		type: 'SHOW_MODAL',
	};
};

const closeModalAction = () => ({
	type: 'CLOSE_MODAL',
});

export {showModalAction, closeModalAction};
