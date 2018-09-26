import { SUBMIT_POST_REQUEST, SUBMIT_POST_SUCCESS, SUBMIT_POST_FAILURE } from './postconstants';

const initialState = {
  pendingPost: false;
}

export const addPost = (state=initialState, action={}) {
  const { type, payload } = action;
  switch (type) {
    case SUBMIT_POST_REQUEST:
      return {
        ...state,
        pendingPost: true
      };
    case SUBMIT_POST_SUCCESS:
      return {
        ...state,
        pendingPost: false,
        [payload.postId]: payload
      };
    case SUBMIT_POST_FAILURE:
      return {
        ...state,
        pendingPost: false
      };
    default:
      return state;
  }
}
