import { UPVOTE_POST_SUCCESS, UPVOTE_POST_FAILURE, DOWNVOTE_POST_SUCCESS, DOWNVOTE_POST_FAILURE, REMOVE_VOTE_FROM_POST } from './postConstants';
import { posts, userVotes } from '../../../fakeDatabase';

export const upvotePost = postId => dispatch => {
  // make API call
  console.log('upvoting', postId);
  dispatch(upvotePostSuccess(postId));

  function upvotePostSuccess(postId) {
    return {
      type: UPVOTE_POST_SUCCESS,
      payload: postId
    }
  }

  function upvotePostFailure(postId) {
    return {
      type: UPVOTE_POST_FAILURE,
      payload: postId
    }
  }
}

export const downvotePost = postId => dispatch => {
  // make API call, have database return updated post object
  console.log('downvoting', postId);
  dispatch(downvotePostSuccess(postId));

  function downvotePostSuccess(postId) {
    return {
      type: DOWNVOTE_POST_SUCCESS,
      payload: postId
    }
  }

  function downvotePostFailure(postId) {
    return {
      type: DOWNVOTE_POST_FAILURE,
      payload: postId
    }
  }
}

export const removeVoteFromPost = postId => {
  return {
    type: REMOVE_VOTE_FROM_POST,
    payload: postId
  }
}
