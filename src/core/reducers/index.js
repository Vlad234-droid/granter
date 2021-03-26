import { combineReducers } from "redux";

import userReducer from "./userReducer";
import registrationReducer from "./registrationReducer";

const appReducer = combineReducers({
  user: userReducer,
  registration: registrationReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
