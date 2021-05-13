import {combineReducers} from 'redux';

import userReducer from './userReducer';
import registrationReducer from './registrationReducer';
import modalReducer from './modalReducer';

const appReducer = combineReducers({
	user: userReducer,
	registration: registrationReducer,
	modal: modalReducer,
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
