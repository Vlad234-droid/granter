import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import services from "../services/";
const { fetchUserData } = services;

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(rest.isloggedIn);
  const dispatch = useDispatch();
  if (rest.isloggedIn) {
    fetchUserData(dispatch);
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        rest.isloggedIn ? <Component /> : <Redirect to='/sign-in/' />
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isloggedIn: state.user.isloggedIn,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
