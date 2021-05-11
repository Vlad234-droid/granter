import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivatRouter";
import CoreRouter from "./CoreRouter";

import WelcomePage from "../../pages/WelcomePage";
import LoginPage from "../../pages/Login";
import ActiveClaimsPage from "../../pages/ActiveClaimsPage";
import FutureClaimsPage from "../../pages/FutureClaimsPage";
import DocumentPage from "../../pages/DocumentPage";
import ProjectsPage from "../../pages/ProjectsPage";
import ProfilePage from "../../pages/ProfilePage";
import ChangePasswordPage from "../../pages/ChangePasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import CreatePasswordPage from "../../pages/CreatePasswordPage";
import AddProjectPage from "../../pages/AddProjectPage";
import DocumentsPage from "../../pages/DocumentsPage";

// TODO Lazy
// function lazyWithPreload(factory) {
//   const Component = React.lazy(factory);
//   Component.preload = factory;
//   return Component;
// }

// const LoginPage = lazyWithPreload(() => import("../../pages/Login"));

const routes = () => {
  return (
    <React.Suspense fallback=''>
      <CoreRouter>
        <Route exact path='/' component={WelcomePage} />
        <Route exact path='/welcome/' component={WelcomePage} />
        <Route exact path='/sign-in/' component={LoginPage} />
        <PrivateRoute
          exact
          path='/active-claims/'
          component={ActiveClaimsPage}
        />
        <PrivateRoute
          exact
          path='/future-claims/'
          component={FutureClaimsPage}
        />
        <PrivateRoute
          exact
          path='/document/:climeId/:id/'
          component={DocumentPage}
        />
        <PrivateRoute exact path='/projects/' component={ProjectsPage} />
        <PrivateRoute exact path='/profile/' component={ProfilePage} />
        <PrivateRoute
          exact
          path='/profile/change-password/'
          component={ChangePasswordPage}
        />
        <PrivateRoute
          exact
          path='/profile/reset-password/'
          component={ResetPasswordPage}
        />
        <PrivateRoute
          exact
          path='/profile/create-password/'
          component={CreatePasswordPage}
        />
        <PrivateRoute
          exact
          path='/profile/add-project/'
          component={AddProjectPage}
        />
        <PrivateRoute exact path='/documents/' component={DocumentsPage} />

        {/* <PrivateRoute exact path='/replies/' component={Login} /> */}
      </CoreRouter>
    </React.Suspense>
  );
};

export default routes;
