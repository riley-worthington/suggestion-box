import { LOAD_POST_LIST_REQUEST, LOAD_POST_LIST_SUCCESS, LOAD_POST_LIST_FAILURE } from './postConstants';
import { SUBMIT_POST_REQUEST, SUBMIT_POST_SUCCESS, SUBMIT_POST_FAILURE } from './postConstants';
import { UPVOTE_POST_SUCCESS, UPVOTE_POST_FAILURE, DOWNVOTE_POST_SUCCESS, DOWNVOTE_POST_FAILURE } from './postConstants';

import { posts } from '../../../fakeDatabase';
const samplePostList = {
  [posts[1].postId]: posts[1],
  [posts[2].postId]: posts[2]
}

export const loadPostListByTeam = teamId => dispatch => {
  // Request team post list from backend
  dispatch(loadPostListRequest(teamId));
  dispatch(loadPostListSuccess(samplePostList));
}

export const loadPostListByUser = userId => dispatch => {
  // Request user post list from backend
  dispatch(loadPostListSuccess(samplePostList));
}

const loadPostListRequest = teamId => {
  return {
    type: LOAD_POST_LIST_REQUEST,
    payload: teamId
  }
}

const loadPostListSuccess = postList => {
  return {
    type: LOAD_POST_LIST_SUCCESS,
    payload: postList
  }
}

const loadPostListFailure = error => {
  return {
    type: LOAD_POST_LIST_FAILURE,
    payload: error
  }
}


export const submitPost = post => dispatch => {
  dispatch(submitPostRequest(post));
  dispatch(submitPostSuccess(post));

  function submitPostRequest(post) {
    return {
      type: SUBMIT_POST_REQUEST,
      payload: post
    }
  }

  function submitPostSuccess(post) {
    return {
      type: SUBMIT_POST_SUCCESS,
      payload: post
    }
  }

  function submitPostFailure(error) {
    return {
      type: SUBMIT_POST_FAILURE,
      payload: error
    }
  }
}

export const upvotePost = postId => dispatch => {
  // make API call, have database return updated post object
  console.log('upvoting', postId);
  const post = posts[postId];
  post.upvotes++;
  dispatch(upvotePostSuccess(post));

  function upvotePostSuccess(post) {
    return {
      type: UPVOTE_POST_SUCCESS,
      payload: post
    }
  }

  function upvotePostFailure(post) {
    return {
      type: UPVOTE_POST_FAILURE,
      payload: post
    }
  }
}

export const downvotePost = postId => dispatch => {
  // make API call, have database return updated post object
  console.log('downvoting', postId);
  const post = posts[postId];
  post.upvotes--;
  dispatch(downvotePostSuccess(post));

  function downvotePostSuccess(post) {
    return {
      type: DOWNVOTE_POST_SUCCESS,
      payload: post
    }
  }

  function downvotePostFailure(post) {
    return {
      type: DOWNVOTE_POST_FAILURE,
      payload: post
    }
  }
}
