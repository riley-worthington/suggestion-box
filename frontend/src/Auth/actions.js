import history from '../helpers/history';
import { users } from '../fakeDatabase';
import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNOUT } from './authconstants';

const sample_user = users[1];

export const signin = (username, password) => dispatch => {
  console.log('signing in');
  console.log('username: ', username, 'password: ', password);

  // Make API call here

  history.push('/');
  localStorage.setItem('user', JSON.stringify(sample_user));
  dispatch(success(sample_user));

  const request = (user) => {
      return {
        type: SIGNIN_REQUEST,
        payload: user
      }
    }
  function success(user) {
    return {
      type: SIGNIN_SUCCESS,
      payload: user
    }
  }
  const failure = (error) => {
    return {
      type: SIGNIN_FAILURE,
      payload: error
    }
  }
}

export const signout = () => {
  console.log('signing out');
  // remove the user from local storage on signout
  localStorage.removeItem('user');
  history.push('/signin');
  return {
    type: SIGNOUT
  };
}
