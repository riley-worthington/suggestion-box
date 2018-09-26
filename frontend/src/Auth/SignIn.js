import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SignIn.css';
import history from '../helpers/history';
import { signIn, signOut } from './authActions';


const mapDispatchToProps = dispatch => {
  return {
    onSubmitSignIn: (username, password) => dispatch(signIn(username, password))
  }
}

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

  handleKeyUp = (event) => {
    event.preventDefault();
    if(event.key !== "Enter") return;
    this.handleSubmit(); // Things you want to do.
  }

  handleSubmit = () => {
    const { signInEmail, signInPassword } = this.state;
    const { onSubmitSignIn } = this.props;
    onSubmitSignIn(signInEmail, signInPassword);
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
            onClick={this.handleSubmit}>
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

export default connect(null, mapDispatchToProps)(SignIn);
