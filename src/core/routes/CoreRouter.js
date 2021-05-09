import React from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import NotFound from "../../pages/NotFound";

const CoreRouter = ({ children }) => {
  return (
    <Switch>
      {children}
      <Route component={NotFound} />
    </Switch>
  );
};

export default CoreRouter;
