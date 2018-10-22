import { combineReducers } from 'redux';
import { SIGNOUT } from './Auth/authConstants';

import { auth } from './Auth/authReducers';
import { feed } from './Home/Feed/PostFeed/postFeedReducers';
import { home } from './Home/homeReducers';
import { posts } from './Home/Feed/Post/postReducers';
import { commentsReducer } from './Home/Feed/CommentFeed/commentFeedReducers';
import { join } from './Home/JoinPage/joinPageReducers';

const appReducer = combineReducers({
  auth,
  feed,
  home,
  posts,
  commentsReducer,
  join,
})

export const rootReducer = (state, action) => {
  // Clear the state on signout
  if (action.type === SIGNOUT) {
    state = undefined
  }

  return appReducer(state, action)
}
