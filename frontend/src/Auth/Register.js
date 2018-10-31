import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from './authActions';
import { Link } from 'react-router-dom';
import './Register.css';

const mapDispatchToProps = dispatch => {
  return {
    onSubmitRegister: (firstName, lastName, email, password) => dispatch(register(firstName, lastName, email, password))
  }
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      invalid: false,
    }
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    if (firstName === '' || lastName === '' || email === '' || password === '') {
      this.setState({
        invalid: true
      });
      return;
    }

    const { onSubmitRegister } = this.props;
    onSubmitRegister(firstName, lastName, email, password);
  }

  render() {
    return (
      <div className='register-container'>
        <h1 className='reg-title'>PostUp</h1>
        <form className='register-form'>
          <label htmlFor='firstName' className='visually-hidden'>First Name</label>
          <input
            className='register-field'
            id='firstName'
            type='text'
            name='firstName'
            placeholder='First Name'
            onChange={this.onChange}
          />
          <label htmlFor='lastName' className='visually-hidden'>Last Name</label>
          <input
            className='register-field'
            id='lastName'
            type='text'
            name='lastName'
            placeholder='Last Name'
            onChange={this.onChange}
          />
          <label htmlFor='email' className='visually-hidden'>Email</label>
          <input
            className='register-field'
            id='email'
            type='email'
            name='email'
            placeholder='Email'
            onChange={this.onChange}
          />
          <label htmlFor='password' className='visually-hidden'>Password</label>
          <input
            className='register-field'
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
          <p className='register-error-message'>
            {this.state.invalid ? 'Please fill out all the fields' : <br/>}
          </p>
        </form>
        <p>
          Already have an account? <Link to='/signin'>Sign In</Link>
        </p>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Register);
