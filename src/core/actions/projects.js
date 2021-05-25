const addProjectsDetails = (data) => {
  console.log('addProjectsDetails', data);
  return {
    type: 'ADD_PROJECTS_DETAILS',
    payload: data,
  };
};

export { addProjectsDetails };
