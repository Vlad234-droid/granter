export const initialState = {
  activeClaimStatus: {
    introduction: false,
    financial: false,
    technical: false,
    deliverables: false,
    submission: false,
  },
  finalReport: null,
};

export const claimsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_STEP_STATUS':
      return {
        ...state,
        activeClaimStatus: {
          ...state.activeClaimStatus,
          [payload.name]: payload.status,
        },
      };

    case 'SET_FINAL_REPORT':
      return {
        ...state,
        finalReport: payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default claimsReducer;
