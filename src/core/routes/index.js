import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivatRouter";
import CoreRouter from "./CoreRouter";

import WelcomePage from "../../pages/WelcomePage";
import LoginPage from "../../pages/Login";
import ActiveClaimsPage from "../../pages/ActiveClaimsPage";
import FutureClaimsPage from "../../pages/FutureClaimsPage";

const routes = () => {
  return (
    <CoreRouter>
      <Route exact path='/' component={WelcomePage} />
      <Route exact path='/welcome/' component={WelcomePage} />
      <Route exact path='/sign-in/' component={LoginPage} />
      <PrivateRoute exact path='/active-claims/' component={ActiveClaimsPage} />
      <PrivateRoute exact path='/future-claims/' component={FutureClaimsPage} />
      {/* <PrivateRoute exact path='/replies/' component={Login} /> */}
    </CoreRouter>
  );
};

export default routes;
