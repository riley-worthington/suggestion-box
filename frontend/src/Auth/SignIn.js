import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './SignIn.css';
import { signIn } from './authActions';

const mapStateToProps = state => {
  return {
    invalid: state.auth.invalid,
  }
}

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
    // event.preventDefault();
    const { signInEmail, signInPassword } = this.state;
    const { onSubmitSignIn } = this.props;
    onSubmitSignIn(signInEmail, signInPassword);
  }

  render() {
    const { invalid } = this.props;
    return (
      <div className="signin-container">
        <header className="App-header">
          <h1 className="App-title">Huddl</h1>
          {/* <p className="app-intro">
            A place for creative collaboration.
          </p> */}
        </header>
        <div className='signin-section'>
          <form
            className="signin-form"
            onSubmit={this.handleSubmit}>
            <label htmlFor='post' className='visually-hidden'>Email</label>
            <input
              id='email'
              className="signin-field"
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.onEmailChange}
              onKeyUp={this.handleKeyUp}
            />
            <label htmlFor='password' className='visually-hidden'>Password</label>
            <input
              id='password'
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
          </form>
          <p className='error-message'>
            {invalid ? 'Wrong credentials' : <br/>}
          </p>
          <div className='register-section'>
            <h1 className='hype'>A place for<br/>creative collaboration.</h1>
            <Link to='/register'>
              <div className='register-link'>
                <p className='link-text'>Register Today</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
