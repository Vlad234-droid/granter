import React from "react";
import { Route } from "react-router-dom";
import WelcomePage from "../../pages/WelcomePage";
import LoginPage from "../../pages/Login";
import PrivateRoute from "./PrivatRouter";
import CoreRouter from "./CoreRouter";

const routes = () => {
  return (
    <CoreRouter>
      <Route exact path='/' component={WelcomePage} />
      <Route exact path='/welcome/' component={WelcomePage} />
      <Route exact path='/sign-in/' component={LoginPage} />
      {/* <PrivateRoute exact path='/replies/' component={Login} /> */}
    </CoreRouter>
  );
};

export default routes;
