import {
  LOAD_COMMENT_LIST_REQUEST,
  LOAD_COMMENT_LIST_SUCCESS,
  LOAD_COMMENT_LIST_FAILURE,
  SUBMIT_COMMENT_REQUEST,
  SUBMIT_COMMENT_SUCCESS,
  SUBMIT_COMMENT_FAILURE,
  UPVOTE_COMMENT_SUCCESS,
  UPVOTE_COMMENT_FAILURE,
  DOWNVOTE_COMMENT_SUCCESS,
  DOWNVOTE_COMMENT_FAILURE,
  REMOVE_VOTE_FROM_COMMENT,
} from './commentFeedConstants';

import { comments } from '../../../fakeDatabase';
const sampleCommentList = [
  comments[1],
  comments[2]
]

export const loadCommentListByPost = postId => dispatch => {
  // Get list of comment IDs from redux store, need a selector

  // Request comment list from backend
  dispatch(loadCommentListRequest(postId));
  dispatch(loadCommentListSuccess(sampleCommentList));

  function loadCommentListRequest(postId) {
    return {
      type: LOAD_COMMENT_LIST_REQUEST,
      payload: postId
    }
  }

  // the payload is the actual list of comment objects
  function loadCommentListSuccess(commentList) {
    return {
      type: LOAD_COMMENT_LIST_SUCCESS,
      payload: commentList
    }
  }

  function loadCommentListFailure(error) {
    return {
      type: LOAD_COMMENT_LIST_FAILURE,
      payload: error
    }
  }
}

export const submitComment = comment => dispatch => {
  dispatch(submitCommentRequest(comment));
  dispatch(submitCommentSuccess(comment));

  function submitCommentRequest(comment) {
    return {
      type: SUBMIT_COMMENT_REQUEST,
      payload: comment
    }
  }

  function submitCommentSuccess(comment) {
    return {
      type: SUBMIT_COMMENT_SUCCESS,
      payload: comment
    }
  }

  function submitCommentFailure(error) {
    return {
      type: SUBMIT_COMMENT_FAILURE,
      payload: error
    }
  }
}

export const upvoteComment = commentId => dispatch => {
  // make API call
  console.log('upvoting', commentId);
  dispatch(upvoteCommentSuccess(commentId));

  function upvoteCommentSuccess(commentId) {
    return {
      type: UPVOTE_COMMENT_SUCCESS,
      payload: commentId
    }
  }

  function upvoteCommentFailure(commentId) {
    return {
      type: UPVOTE_COMMENT_FAILURE,
      payload: commentId
    }
  }
}

export const downvoteComment = commentId => dispatch => {
  // make API call, have database return updated comment object
  console.log('downvoting', commentId);
  dispatch(downvoteCommentSuccess(commentId));

  function downvoteCommentSuccess(commentId) {
    return {
      type: DOWNVOTE_COMMENT_SUCCESS,
      payload: commentId
    }
  }

  function downvoteCommentFailure(commentId) {
    return {
      type: DOWNVOTE_COMMENT_FAILURE,
      payload: commentId
    }
  }
}

export const removeVoteFromComment = commentId => {
  return {
    type: REMOVE_VOTE_FROM_COMMENT,
    payload: commentId
  }
}
