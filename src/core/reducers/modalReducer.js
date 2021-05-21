export const initialState = {
  visibleModal: false,
  isVisibleNotifications: false,
  isVisibleSubMenu: [],
  isVisibleModalDelete: false,
  isVisibleModalDeleteDocs: false,
};

export const modalReducer = (state = initialState, { type, payload }) => {
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
    default:
      return {
        ...state,
      };
  }
};

export default modalReducer;
