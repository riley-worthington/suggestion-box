import history from '../helpers/history';
import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './authConstants';


export const signIn = (email, password) => dispatch => {
  dispatch(signInRequest(email, password))

  // Make API call here
  fetch(`${process.env.REACT_APP_API_URL}/signin`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(response => response.json())
    .then(user => {
      console.log(user)
      if (user.user_id) {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(signInSuccess(user));
        history.push('/');
      } else {
        dispatch(signInFailure('Wrong credentials'));
      }
    })

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
  fetch(`${process.env.REACT_APP_API_URL}/register`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    })
  }).then(response => response.json())
    .then(user => {
      console.log(user)
      if (user.user_id) {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(registerSuccess(user));
        history.push('/');
      } else {
        dispatch(registerFailure(user));
      }
    })

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
