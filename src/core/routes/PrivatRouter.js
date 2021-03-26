import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
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
