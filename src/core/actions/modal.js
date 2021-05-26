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

const showModalDelete = (payload) => ({
  type: 'SHOW_MODAL_DELETE',
  payload,
});

const closeModalDelete = () => ({
  type: 'CLOSE_MODAL_DELETE',
});

const showModalDeleteDocs = (payload) => ({
  type: 'SHOW_MODAL_DELETE_DOCS',
  payload,
});

const closeModalDeleteDocs = () => ({
  type: 'CLOSE_MODAL_DELETE_DOCS',
});

const showBlurSheduleCall = (payload) => ({
  type: 'SHOW_BLUR_SHEDULE_CALL',
  payload,
});

const closeBlurSheduleCall = () => ({
  type: 'CLOSE_BLUR_SHEDULE_CALL',
});

const showBlurActiveTechnicals = (payload) => ({
  type: 'SHOW_BLUR_ACTIVE_TECHNICALS',
  payload,
});

const closeBlurActiveTechnicals = () => ({
  type: 'CLOSE_BLUR_ACTIVE_TECHNICALS',
});

export {
  showModalAction,
  closeModalAction,
  showModalNotifications,
  closeModalNotifications,
  showSubMenu,
  closeSubMenu,
  showModalDelete,
  closeModalDelete,
  showModalDeleteDocs,
  closeModalDeleteDocs,
  showBlurSheduleCall,
  closeBlurSheduleCall,
  showBlurActiveTechnicals,
  closeBlurActiveTechnicals,
};
