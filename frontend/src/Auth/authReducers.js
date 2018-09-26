import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNOUT } from './authConstants';

let user = JSON.parse(localStorage.getItem('user'));
console.log('found in local storage:', user)
const initialState = user ?
  { isAuthenticated: true,
    invalid: false,
    currentUser: user,
  } : {
    isAuthenticated: false,
    invalid: false,
    currentUser: null,
  };

// const initialState = {
//   isAuthenticated: false,
//   invalid: false,
//   currentUser: null,
// }

export const loadUser = (state=initialState, action={}) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        invalid: false,
        currentUser: payload
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        invalid: true,
        currentUser: null
      };
    case SIGNOUT:
      return {
        ...state,
        isAuthenticated: false,
        invalid: false,
        currentUser: null,
      }
    default:
      return state;
  }
}
