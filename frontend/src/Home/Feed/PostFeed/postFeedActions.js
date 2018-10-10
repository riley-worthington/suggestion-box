import { LOAD_POST_LIST_REQUEST, LOAD_POST_LIST_SUCCESS, LOAD_POST_LIST_FAILURE } from './postFeedConstants';
import { SUBMIT_POST_REQUEST, SUBMIT_POST_SUCCESS, SUBMIT_POST_FAILURE } from './postFeedConstants';

import { posts, userVotes } from '../../../fakeDatabase';

// What the postList would look like coming from the API
const samplePostList = [
  posts[1],
  posts[2]
]

export const loadPostListByTeam = teamId => dispatch => {
  dispatch(loadPostListRequest(teamId));

  // Request team post list from backend
  fetch(`http://localhost:3000/teams/1/posts`, {
    method: 'get'
  })
  .then(response => response.json())
  .then(postList => {
    if (postList) {
      dispatch(loadPostListSuccess(postList));
    } else {
      dispatch(loadPostListFailure('failed'));
    }
  })

  // dispatch(loadPostListSuccess(samplePostList));
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
