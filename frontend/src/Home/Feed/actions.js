import { LOAD_POST_LIST_REQUEST, LOAD_POST_LIST_SUCCESS, LOAD_POST_LIST_FAILURE } from './constants';

import { posts } from '../../fakeDatabase';
const samplePostList = {
  [posts[1].postid]: posts[1],
  [posts[2].postid]: posts[2]
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
