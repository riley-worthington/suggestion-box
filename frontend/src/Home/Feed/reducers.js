import { LOAD_POST_LIST_REQUEST, LOAD_POST_LIST_SUCCESS, LOAD_POST_LIST_FAILURE } from './constants';

const initialState = {
  loadPostListPending: false,
  postList: {}
}

export const loadPostList = (state=initialState, action={}) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_POST_LIST_REQUEST:
      return {
        ...state,
        loadPostListPending: true
      };
    case LOAD_POST_LIST_SUCCESS:
      return  {
        ...state,
        loadPostListPending: false,
        postList: payload
      };
    case LOAD_POST_LIST_FAILURE:
      return {
        ...state,
        loadPostListPending: false
      };
    default:
      return state;
  }
}
