import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './core/routes';
import store from './store.js';
import './index.scss';
import { Provider } from 'react-redux';

//import reportWebVitals from "./reportWebVitals";

//const actions = bindActionCreators();

ReactDOM.render(
  <Provider store={store}>
    <Router basename="/">
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
