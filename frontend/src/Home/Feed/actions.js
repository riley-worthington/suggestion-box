import { GET_POST_LIST_REQUEST, GET_POST_LIST_SUCCESS, GET_POST_LIST_FAILURE } from './constants';
import { posts } from '../../fakeDatabase';

const samplePostList = [posts[1], posts[2]];

export const getPostListByTeam = teamId => dispatch => {
  // Request team post list from backend
  dispatch(success(samplePostList));
}

export const getPostListByUser = userId => {
  // Request user post list from backend
  dispatch(success(samplePostList));
}

const requestPostList = teamId => {
  return {
    type: GET_POST_LIST_REQUEST,
    payload: teamId
  }
}

const success = postList => {
  return {
    type: GET_POST_LIST_SUCCESS,
    payload: postList
  }
}

const failure = error => {
  type: GET_POST_LIST_FAILURE,
  payload: error
}
