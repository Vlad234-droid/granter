import React from 'react';
// import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserData } from '../services/';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const isloggedIn = useSelector((state) => state.user.isloggedIn);
  const userData = useSelector((state) => state.user.data);

  if (isloggedIn && !userData) {
    fetchUserData(dispatch);
  }

  return <Route {...rest} render={(props) => (isloggedIn ? <Component /> : <Redirect to="/sign-in/" />)} />;
};

// const mapStateToProps = (state) => {
//   return {
//     isloggedIn: state.user.isloggedIn,
//     userData: state.user.data,
//   };
// };

export default PrivateRoute;
