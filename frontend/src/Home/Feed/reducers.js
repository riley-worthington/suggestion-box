import { GET_POST_LIST_REQUEST, GET_POST_LIST_SUCCESS, GET_POST_LIST_FAILURE } from './constants';

const initialState = {
  pendingGetPostList: false
}

export const getPostList = (state=initialState, action={}) {
  const { type, payload } = action;
  switch (type) {
    case GET_POST_LIST_REQUEST:
      return {
        ...state,
        pendingGetPostList: true
      };
    case GET_POST_LIST_SUCCESS:
      return  {
        ...state,
        pendingGetPostList: false,
        postList: payload
      };
    case GET_POST_LIST_FAILURE:
      return {
        ...state,
        pendingGetPostList: false
      };
    default:
      return state;
  }
}
