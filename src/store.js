import { createStore } from 'redux';
//import thunkMiddleware from 'redux-thunk';

import reducer from './core/reducers';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
