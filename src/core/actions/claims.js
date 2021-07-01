const setStepStatus = (claim) => ({
  type: 'SET_STEP_STATUS',
  payload: claim,
});

const setFinalReport = (claim) => ({
  type: 'SET_FINAL_REPORT',
  payload: claim,
});

const setClaimsToFalse = () => ({
  type: 'SET_CLAIMS_TO_FALSE',
});

export { setStepStatus, setFinalReport, setClaimsToFalse };
