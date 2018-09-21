import React, { Component } from 'react';
import Home from './components/Home';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
// } from "react-router-dom";

import SignIn from './components/SignIn'
import './App.css';

const initialState = {
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined,
      }
    })
  }

  onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState(initialState);
		} else if (route === 'home') {
			this.setState({isSignedIn: true});
		}
		this.setState({ route: route });
	}

  renderSwitch(route) {
		switch(route) {
			case 'signin':
				return (
					<SignIn
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
				);
			case 'signout':
				return (
					<SignIn
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
				);
			case 'home':
				return (
					<Home
            isSignedIn={this.state.isSignedIn}
            onRouteChange={this.onRouteChange}
          />
				);
			case 'register':
				return (
					<h1>Register</h1>
				);
			default:
				return (
					<div>Error</div>
				);
		}
	}

  render() {
    return (
      <div className="App">
        {this.renderSwitch(this.state.route)}
      </div>
    );
  }
}

export default App;
