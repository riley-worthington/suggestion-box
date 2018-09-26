import { SUBMIT_POST_REQUEST, SUBMIT_POST_SUCCESS, SUBMIT_POST_FAILURE } from './postconstants';

export const submitPost = post => dispatch => {
  dispatch(request(post));
  dispatch(success(post));

  function request(post) {
    return {
      type: SUBMIT_POST_REQUEST,
      payload: post
    }
  }

  function success(post) {
    return {
      type: SUBMIT_POST_SUCCESS,
      payload: post
    }
  }

  function failure(error) {
    type: SUBMIT_POST_FAILURE,
    payload: error
  }
}
