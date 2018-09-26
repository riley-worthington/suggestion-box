import history from '../helpers/history';
import { users } from '../fakeDatabase';
import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNOUT } from './authConstants';

const sample_user = users[1];

export const signIn = (username, password) => dispatch => {
  console.log('signing in');
  console.log('username: ', username, 'password: ', password);

  // Make API call here

  history.push('/');
  localStorage.setItem('user', JSON.stringify(sample_user));
  dispatch(signInSuccess(sample_user));

  function signInRequest(user) {
      return {
        type: SIGNIN_REQUEST,
        payload: user
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
