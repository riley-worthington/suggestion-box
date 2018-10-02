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
          <Route path='/signin' component={SignIn} />
          <Route path='/register' component={Register} />
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute path={`/teams/:teamId`} component={Home} />
          <PrivateRoute path={`/posts/:postId`} component={Home} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
