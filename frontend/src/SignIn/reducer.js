
const initialState = {
  isAuthenticated: false,
  invalid: false,
  currentUser: null,
}

export const loadUser = (state=initialState, action={}) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        invalid: false,
        currentUser: payload.user
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        invalid: true,
        currentUser: null
      };
    case SIGNOUT_SUCCESS:
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
