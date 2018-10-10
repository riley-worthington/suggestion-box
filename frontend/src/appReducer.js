import { combineReducers } from 'redux';
import { SIGNOUT } from './Auth/authConstants';

import { auth } from './Auth/authReducers';
import { feed } from './Home/Feed/PostFeed/postFeedReducers';
import { postsById } from './Home/Feed/Post/postReducers';
import { commentsReducer } from './Home/Feed/CommentFeed/commentFeedReducers';

const appReducer = combineReducers({
  auth,
  feed,
  postsById,
  commentsReducer,
})

export const rootReducer = (state, action) => {
  // Clear the state on signout
  if (action.type === SIGNOUT) {
    state = undefined
  }

  return appReducer(state, action)
}
