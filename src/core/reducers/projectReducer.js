export const initialState = {
  activeProject: {},
};

export const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_PROJECT_DETAILS':
      return {
        ...state,
        activeProject: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default projectReducer;
