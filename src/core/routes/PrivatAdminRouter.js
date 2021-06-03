import React from 'react';
// import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoadingPage from '../../pages/LoadingPage';

import { fetchUserData } from '../services';

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const isloggedIn = useSelector((state) => state.user.isloggedIn);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const userData = useSelector((state) => state.user.data);

  if (isloggedIn && !userData) {
    fetchUserData(dispatch);
  }

  const CurrentComponent = isloggedIn ? (
    !userData ? (
      <LoadingPage />
    ) : isAdmin ? (
      <Component />
    ) : (
      <Redirect to="/active-claims" />
    )
  ) : (
    <Redirect to="/sign-in/" />
  );

  return <Route {...rest} render={(props) => CurrentComponent} />;
};

// const mapStateToProps = (state) => {
//   return {
//     isloggedIn: state.user.isloggedIn,
//     userData: state.user.data,
//   };
// };

export default PrivateAdminRoute;
