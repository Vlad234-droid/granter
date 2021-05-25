export const initialState = {
  projectsList: null,
};

export const projectsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_PROJECTS_DETAILS':
      return {
        projectsList: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default projectsReducer;
