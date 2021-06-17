import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DocSign from '../../pages/DocSign';
import LoadingPage from '../../pages/LoadingPage';

import { fetchUserData } from '../services/';

const PrivateRoute = ({ component: Component, ...rest }) => {
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
    ) : !isAdmin ? (
      userData.profile.id_status ? (
        <Component />
      ) : (
        <DocSign />
      )
    ) : (
      <Redirect to="/admin/clients" />
    )
  ) : (
    <Redirect to="/sign-in/" />
  );
  //const CurrentComponent = isloggedIn ? (
  //  !userData ? (
  //    <LoadingPage />
  //  ) : !isAdmin ? (
  //    !userData.profile?.id_status ? (
  //      <Redirect to="/docSign" />
  //    ) : (
  //      <Component />
  //    )
  //  ) : (
  //    <Redirect to="/admin/clients" />
  //  )
  //) : (
  //  <Redirect to="/sign-in/" />
  //);

  return <Route {...rest} render={(props) => CurrentComponent} />;
};

export default PrivateRoute;
