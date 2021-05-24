const addProjectDetails = (newBooks) => {
  return {
    type: 'ADD_PROJECT_DETAILS',
    payload: newBooks,
  };
};

export { addProjectDetails };
