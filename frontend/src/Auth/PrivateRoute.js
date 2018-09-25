import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// When implementing actual sign in, use localStorage.getItem('user')
// instead of true
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props =>
      true ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )}
  />
);

export default PrivateRoute;
