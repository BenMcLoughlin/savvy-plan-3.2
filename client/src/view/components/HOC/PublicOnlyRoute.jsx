import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

export const PrivateRoute = (props) => {
  const { token } = props.state.auth_reducer;
  return token ? <Route {...props} component={props.component} render={props.render} /> : <Redirect to="/" />;
};
