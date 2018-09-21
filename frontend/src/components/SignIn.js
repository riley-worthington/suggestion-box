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

  render() {
    return (
      <div className="signin-container">
        <header className="App-header">
          <h1 className="App-title">SuggestionBox</h1>
        </header>
        <form className="signin-form" onSubmit={this.onSubmitSignIn}>
          <input
            className="signin-field"
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.onEmailChange}
          />
          <input
            className="signin-field"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.onPasswordChange}
          />
          <button
            className="signin-button"
            type="submit"
            name="signin"
            onClick={this.onSubmitSignIn}>
              Sign In
          </button>
        </form>
        <p className="App-intro">
          A place for creative collaboration.
        </p>
      </div>
    );
  }
}

export default SignIn;
