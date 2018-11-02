import React, { Component, Fragment } from 'react';
import { Router, Route } from "react-router-dom";

import Home from './Home/Home';
import PrivateRoute from './Auth/PrivateRoute';
import SignIn from './Auth/SignIn';
import Register from './Auth/Register';
import history from './helpers/history';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <Fragment>
          <Route path={`${process.env.PUBLIC_URL}/signin`} component={SignIn} />
          <Route path={`${process.env.PUBLIC_URL}/register`} component={Register} />
          <PrivateRoute exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
          <PrivateRoute path={`${process.env.PUBLIC_URL}/teams/:teamId`} component={Home} />
          <PrivateRoute path={`${process.env.PUBLIC_URL}/posts/:postId`} component={Home} />
          <PrivateRoute exact path={`${process.env.PUBLIC_URL}/join`} component={Home} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
