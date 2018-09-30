import { LOAD_COMMENT_LIST_REQUEST, LOAD_COMMENT_LIST_SUCCESS, LOAD_COMMENT_LIST_FAILURE } from './commentFeedConstants';
import { SUBMIT_COMMENT_REQUEST, SUBMIT_COMMENT_SUCCESS, SUBMIT_COMMENT_FAILURE } from './commentFeedConstants';

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
