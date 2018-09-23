import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignIn = () => {
    let email = this.state.signInEmail;
    let password = this.state.signInPassword;
    console.log(email, password);
    this.props.onRouteChange('home');
  }

  handleKeyUp = (event) => {
    if(event.key !== "Enter") return;
    this.onSubmitSignIn(); // Things you want to do.
    event.preventDefault();
  }

  render() {
    return (
      <div className="signin-container">
        <header className="App-header">
          <h1 className="App-title">SuggestionBox</h1>
        </header>
        <div className="signin-form">
          <input
            className="signin-field"
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.onEmailChange}
            onKeyUp={this.handleKeyUp}
          />
          <input
            className="signin-field"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.onPasswordChange}
            onKeyUp={this.handleKeyUp}
          />
          <button
            className="signin-button"
            type="button"
            name="signin"
            onClick={this.onSubmitSignIn}>
              Sign In
          </button>
        </div>
        <p className="App-intro">
          A place for creative collaboration.
        </p>
      </div>
    );
  }
}

export default SignIn;
