import { combineReducers } from 'redux';

import userReducer from './userReducer';
import registrationReducer from './registrationReducer';
import modalReducer from './modalReducer';
import projectsReducer from './projectsReducer';
import claimsReducer from './claimsReducer';

const appReducer = combineReducers({
  user: userReducer,
  registration: registrationReducer,
  modal: modalReducer,
  projects: projectsReducer,
  claims: claimsReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
