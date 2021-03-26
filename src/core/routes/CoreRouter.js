import React from "react";
import { Switch } from "react-router-dom";

const CoreRouter = ({ children }) => {
  return (
    <Switch>
      {children}
      {/* <Route component={Login} /> */}
    </Switch>
  );
};

export default CoreRouter;
