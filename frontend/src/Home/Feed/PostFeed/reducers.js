import { LOAD_POST_LIST_REQUEST, LOAD_POST_LIST_SUCCESS, LOAD_POST_LIST_FAILURE } from './constants';
import { SUBMIT_POST_REQUEST, SUBMIT_POST_SUCCESS, SUBMIT_POST_FAILURE } from './constants';

const initialState = {
  loadPostListPending: false,
  postList: {},
  pendingPost: false,
  newPost: null
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
    case SUBMIT_POST_REQUEST:
      return {
        ...state,
        pendingPost: true,
        newPost: payload
      };
    case SUBMIT_POST_SUCCESS:
      console.log(payload.postId);
      return {
        ...state,
        pendingPost: false,
        postList: {
          ...state.postList,
          [payload.postId]: payload
        }
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

// const newPostInitialState = {
//   pendingPost: false,
//   newPost: null
// }
//
// export const addPost = (state=newPostInitialState, action={}) => {
//   const { type, payload } = action;
//   switch (type) {
//     case SUBMIT_POST_REQUEST:
//       return {
//         ...state,
//         pendingPost: true,
//         newPost: payload
//       };
//     case SUBMIT_POST_SUCCESS:
//       console.log(payload.postId);
//       return {
//         ...state,
//         pendingPost: false,
//         postList: {
//           ...state.postList,
//           [payload.postId]: payload
//         }
//       };
//     case SUBMIT_POST_FAILURE:
//       return {
//         ...state,
//         pendingPost: false
//       };
//     default:
//       return state;
//   }
// }
