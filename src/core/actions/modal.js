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

const showSubMenu = (payload) => ({
  type: 'SHOW_SUBMENU',
  payload,
});

const closeSubMenu = () => ({
  type: 'CLOSE_SUBMENU',
});

export {
  showModalAction,
  closeModalAction,
  showModalNotifications,
  closeModalNotifications,
  showSubMenu,
  closeSubMenu,
};
