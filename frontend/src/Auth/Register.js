import React, { Component } from 'react';

import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div className='register-container'>
        <h1>Register</h1>
        <form className='register-form'>
          <label htmlFor='firstName' className='visually-hidden'>First Name</label>
          <input
            id='firstName'
            type='text'
            name='firstName'
            placeholder='First Name'
            onChange={this.onChange}
          />
          <label htmlFor='lastName' className='visually-hidden'>Last Name</label>
          <input
            id='lastName'
            type='text'
            name='lastName'
            placeholder='Last Name'
            onChange={this.onChange}
          />
          <label htmlFor='email' className='visually-hidden'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            placeholder='Email'
            onChange={this.onChange}
          />
          <label htmlFor='password' className='visually-hidden'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            placeholder='Password'
            onChange={this.onChange}
          />
          <button
            className="register-button"
            type="button"
            name="signin"
            onClick={this.handleSubmit}>
              Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
