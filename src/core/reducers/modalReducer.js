export const initialState = {
  isBlur: false,
  visibleModal: false,
  isVisibleNotifications: false,
  isVisibleSubMenu: [],
  isVisibleModalDelete: false,
  isVisibleModalDeleteDocs: false,
  isVisibleBlurSheduleCall: false,
  isVisibleActiveTechnical: false,
  isVisibleActiveSteps: false,
  isVisibleProjectPage: false,
};

export const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_IS_BLUR':
      return {
        ...state,
        isBlur: payload,
      };
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
    case 'SHOW_SUBMENU':
      return {
        ...state,
        isVisibleSubMenu: payload,
      };

    case 'CLOSE_SUBMENU':
      return {
        ...state,
        isVisibleSubMenu: [],
      };
    case 'SHOW_MODAL_DELETE':
      return {
        ...state,
        isVisibleModalDelete: true,
      };

    case 'CLOSE_MODAL_DELETE':
      return {
        ...state,
        isVisibleModalDelete: false,
      };

    case 'SHOW_MODAL_DELETE_DOCS':
      return {
        ...state,
        isVisibleModalDeleteDocs: true,
      };

    case 'CLOSE_MODAL_DELETE_DOCS':
      return {
        ...state,
        isVisibleModalDeleteDocs: false,
      };
    case 'SHOW_BLUR_SHEDULE_CALL':
      return {
        ...state,
        isVisibleBlurSheduleCall: true,
      };

    case 'CLOSE_BLUR_SHEDULE_CALL':
      return {
        ...state,
        isVisibleBlurSheduleCall: false,
      };
    case 'SHOW_BLUR_ACTIVE_TECHNICALS':
      return {
        ...state,
        isVisibleActiveTechnical: true,
      };
    case 'CLOSE_BLUR_ACTIVE_TECHNICALS':
      return {
        ...state,
        isVisibleActiveTechnical: false,
      };
    case 'BLUR_ACTIVE_STEPS':
      return {
        ...state,
        isVisibleActiveSteps: !state.isVisibleActiveSteps,
      };
    case 'BLUR_ACTIVE_PR_PAGE':
      return {
        ...state,
        isVisibleProjectPage: !state.isVisibleProjectPage,
      };
    default:
      return {
        ...state,
      };
  }
};

export default modalReducer;
