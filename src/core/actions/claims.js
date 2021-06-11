const setStepStatus = (claim) => ({
  type: 'SET_STEP_STATUS',
  payload: claim,
});

const setFinalReport = (claim) => ({
  type: 'SET_FINAL_REPORT',
  payload: claim,
});

export { setStepStatus, setFinalReport };
