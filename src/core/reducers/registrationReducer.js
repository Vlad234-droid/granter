const initialState = {
  loader: false,
  error: null,
  success: false,
  name: '',
  number: '',
  email: '',
  industry: [],
  password: '',
  staffing_costs: 0,
  materials_costs: 0,
  subcontracting_costs: 0,
  software_costs: 0,
  industriesList: [],
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_REGISTER_REQUEST':
      return {
        ...state,
        isloggedIn: false,
        loader: true,
        error: null,
        success: false,
      };

    case 'FETCH_REGISTER_SUCCESS':
      return {
        ...state,
        isloggedIn: action.payload,
        loader: false,
        error: null,
        success: true,
      };

    case 'FETCH_REGISTER_FAILURE':
      return {
        ...state,
        isloggedIn: false,
        loader: false,
        error: action.payload,
        success: false,
      };
    case 'FETCH_REGISTER_UPDATE_STATE':
      return {
        ...state,
        ...action.payload,
      };

    case 'REGISTER_SET_ALL_INDUSTRIES':
      return {
        ...state,
        industriesList: action.payload,
      };

    default:
      return state;
  }
};

export default registrationReducer;
