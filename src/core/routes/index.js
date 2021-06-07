import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivatRouter';
import PrivateAdminRoute from './PrivatAdminRouter';
import CoreRouter from './CoreRouter';

import WelcomePage from '../../pages/WelcomePage';
import LoginPage from '../../pages/Login';
import ActiveClaimsPage from '../../pages/ActiveClaimsPage';
import FutureClaimsPage from '../../pages/FutureClaimsPage';
import DocumentPage from '../../pages/DocumentPage';
import ProjectsPage from '../../pages/ProjectsPage';
// import ProfilePage from '../../pages/ProfilePage';
import ChangePasswordPage from '../../pages/ChangePasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage';
import CreatePasswordPage from '../../pages/CreatePasswordPage';
import AddProjectPage from '../../pages/AddProjectPage';
import DocumentsPage from '../../pages/DocumentsPage';
import NoFoundDoc from '../../pages/NoFoundDoc';
import AdminProfilePage from '../../pages/AdminProfilePage';
import AdminActiveClaimsPage from '../../pages/AdminActiveClaimsPage';
import AdminClientsPage from '../../pages/AdminClientsPage';
import AdminSettings from '../../pages/AdminSettings';
import AdminAddClient from '../../pages/AdminAddClient';
import CongratulationsPage from '../../pages/CongratulationsPage';

//TODO Lazy
function lazyWithPreload(factory) {
  const Component = React.lazy(factory);
  Component.preload = factory;
  return Component;
}

const ProfilePage = lazyWithPreload(() => import('../../pages/ProfilePage'));

const routes = () => {
  return (
    <React.Suspense fallback="">
      <CoreRouter>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/welcome/" component={WelcomePage} />
        <Route exact path="/sign-in/" component={LoginPage} />
        <PrivateRoute exact path="/active-claims/" component={ActiveClaimsPage} />
        <PrivateRoute exact path="/active-claims/congratulations" component={CongratulationsPage} />
        <PrivateRoute exact path="/future-claims/" component={FutureClaimsPage} />
        <PrivateRoute exact path="/document/:climeId/:id/" component={DocumentPage} />
        <PrivateRoute exact path="/document/notFound/" component={NoFoundDoc} />
        <PrivateRoute exact path="/project/:climeId/:id" component={ProjectsPage} />
        <PrivateRoute exact path="/project/:climeId/" component={ProjectsPage} />
        <PrivateRoute exact path="/profile/" component={ProfilePage} />
        <PrivateRoute exact path="/profile/change-password/" component={ChangePasswordPage} />
        <PrivateRoute exact path="/reset-password/" component={ResetPasswordPage} />
        <PrivateRoute exact path="/create-password/" component={CreatePasswordPage} />
        <PrivateRoute exact path="/profile/add-project/" component={AddProjectPage} />
        <PrivateRoute exact path="/documents/:step" component={DocumentsPage} />
        <PrivateRoute exact path="/admin/clients" component={AdminClientsPage} />
        <PrivateAdminRoute exact path="/admin/client/:id" component={AdminProfilePage} />
        <PrivateAdminRoute exact path="/admin/active-claim/:id" component={AdminActiveClaimsPage} />
        <PrivateRoute exact path="/admin/settings" component={AdminSettings} />
        <PrivateRoute exact path="/admin/add-client" component={AdminAddClient} />
        <PrivateRoute exact path="/admin/add-company" component={AdminAddClient} />

        {/* <PrivateRoute exact path='/replies/' component={Login} /> */}
      </CoreRouter>
    </React.Suspense>
  );
};

export default routes;
