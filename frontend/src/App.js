import React, { Component } from 'react';
import Home from './Home/Home';
import {
  Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import PrivateRoute from './Auth/PrivateRoute';
import SignIn from './Auth/SignIn';
import './App.css';
import { users } from './fakeDatabase';
import history from './helpers/history';

// const sample_user = {
//   firstname: 'Riley',
//   lastname: 'Worthington',
//   email: 'riley@gmail.com',
//   posts: [1],
//   comments: [2],
//   groups: ['Whitman', 'SuggestionBox'],
//   userid: 123,
// }
//
// const sample_group = {
//   name: 'SuggestionBox',
//   groupid: 33,
//   members: [123],
//   posts: [1],
// }
//
// const sample_post = {
//   originalPoster: 123,
//   upvotes: 10,
//   downvotes: 1,
//   comments: [2],
//   postid: 1,
//   title: 'First ever post',
//   content: "This app is so cool!"
// }
//
// const sample_comment = {
//   commenter: 123,
//   post: 1,
//   commentid: 2,
//   upvotes: 5,
//   downvotes: 2,
//   content: "Yeah it is. I'm talking to myself."
// }

const initialState = {
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    groups: [],
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
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        groups: data.groups,
        joined: data.joined,
      }
    })
  }

  renderSwitch(route) {
		switch(route) {
			case 'signin':
				return (
					<SignIn
            loadUser={this.loadUser}
          />
				);
			case 'signout':
				return (
					<SignIn
            loadUser={this.loadUser}
          />
				);
			case 'home':
        console.log(users[1])
				return (
					<Home
            user={users[1]}
            isSignedIn={this.state.isSignedIn}
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

  // render() {
  //   return (
  //     <div className="App">
  //       {this.renderSwitch(this.state.route)}
  //     </div>
  //   );
  // }
  render() {
    return (
      <Router history={history}>
        <div>
          <PrivateRoute exact path='/' component={Home} />
          <Route path='/signin' component={SignIn} />
        </div>
      </Router>
    );
  }
}

export default App;
