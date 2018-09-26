import React, { Component } from 'react';
import { Router, Route } from "react-router-dom";

import Home from './Home/Home';
import PrivateRoute from './Auth/PrivateRoute';
import SignIn from './Auth/SignIn';
import history from './helpers/history';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <Route path='/signin' component={SignIn} />
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute path={`/teams/:teamId`} component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
