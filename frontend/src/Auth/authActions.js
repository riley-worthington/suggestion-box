import history from '../helpers/history';
import { users } from '../fakeDatabase';
import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNOUT } from './authConstants';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from './authConstants';

const sample_user = users[1];

export const signIn = (email, password) => dispatch => {
  console.log('signing in');
  console.log('email: ', email, 'password: ', password);

  // Make API call here
  dispatch(signInRequest(email, password))

  history.push('/');
  localStorage.setItem('user', JSON.stringify(sample_user));
  dispatch(signInSuccess(sample_user));

  function signInRequest(email, password) {
    return {
      type: SIGNIN_REQUEST,
      payload: {
        email,
        password
      }
    }
  }
  function signInSuccess(user) {
    return {
      type: SIGNIN_SUCCESS,
      payload: user
    }
  }
  function signInFailure(error) {
    return {
      type: SIGNIN_FAILURE,
      payload: error
    }
  }
}

export const signOut = () => {
  console.log('signing out');
  // remove the user from local storage on signout
  localStorage.removeItem('user');
  history.push('/signin');
  return {
    type: SIGNOUT
  };
}

export const register = (firstName, lastName, email, password) => dispatch => {
  dispatch(registerRequest(firstName, lastName, email, password));

  // Send data to API, get user object as response

  function registerRequest(firstName, lastName, email, password) {
    return {
      type: REGISTER_REQUEST,
      payload: {
        firstName,
        lastName,
        email,
        password
      }
    }
  }

  function registerSuccess(user) {
    return {
      type: REGISTER_SUCCESS,
      payload: user
    }
  }

  function registerFailure(error) {
    return {
      type: REGISTER_FAILURE,
      payload: error
    }
  }
}
