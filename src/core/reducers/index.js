import { combineReducers } from 'redux';

import userReducer from './userReducer';
import registrationReducer from './registrationReducer';
import modalReducer from './modalReducer';
import projectReducer from './projectReducer';

const appReducer = combineReducers({
  user: userReducer,
  registration: registrationReducer,
  modal: modalReducer,
  project: projectReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
