import { combineReducers } from 'redux';
import { SIGNOUT } from './Auth/authConstants';

import { loadUser } from './Auth/authReducers';
import { loadPostList } from './Home/Feed/reducers';

const appReducer = combineReducers({
  user: loadUser,
  posts: loadPostList
})

export const rootReducer = (state, action) => {
  // Clear the state on signout
  if (action.type === SIGNOUT) {
    state = undefined
  }

  return appReducer(state, action)
}
