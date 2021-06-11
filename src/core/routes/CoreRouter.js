import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../core/actions';

import NotFound from '../../pages/NotFound';

const CoreRouter = ({ children }) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { setPrevRout } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    return () => {
      setPrevRout(location.pathname);
    };
  }, [location]);

  return (
    <Switch>
      {children}
      <Route component={NotFound} />
    </Switch>
  );
};

export default CoreRouter;
