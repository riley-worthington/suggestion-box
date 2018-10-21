import {
  UPVOTE_POST_SUCCESS,
  UPVOTE_POST_FAILURE,
  DOWNVOTE_POST_SUCCESS,
  DOWNVOTE_POST_FAILURE,
  REMOVE_VOTE_FROM_POST,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
 } from './postConstants';
import {
  LOAD_POST_LIST_SUCCESS,
  SUBMIT_POST_SUCCESS,
} from '../PostFeed/postFeedConstants';

/* STORE SCHEMA

  postsById = {
    postId: {
      originalPoster: userId,
      title: text,
      content: text,
      date: timestamp,
      upvotes: integer,
      downvotes: integer,
      currentUserVote: -1, 0, or 1,
    }
  }

*/

const initialState = {
  postsById: {},
  loadPostPending: false,
  currentPost: null
};

export const posts = (state=initialState, action={}) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_POST_LIST_SUCCESS:
      const posts = payload.reduce((obj, post) => {
        post['currentUserVote'] = 0;
         obj[post.post_id] = post;
         return obj;
       }, {});
      return {
        ...state,
        postsById: posts
      }
    case LOAD_POST_REQUEST:
      return {
        ...state,
        loadPostPending: true
      }
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        loadPostPending: false,
        currentPost: payload.post_id,
        postsById: {
          ...state.postsById,
          [payload.post_id]: payload
        }
      }
    case LOAD_POST_FAILURE:
      return {
        ...state,
        loadPostPending: false
      }
    case UPVOTE_POST_SUCCESS:
      // const currentUpvotes = state.postsById[postId].upvotes;
      return {
        ...state,
        postsById: {
          ...state.postsById,
          [payload.post_id]: {
            ...state.postsById[payload.post_id],
            upvotes: payload.upvotes,
            downvotes: payload.downvotes,
            currentUserVote: 1
          }
        }
      };
    case DOWNVOTE_POST_SUCCESS:
      // const currentDownvotes = state.postsById[postId].downvotes;
      return {
        ...state,
        postsById: {
          ...state.postsById,
          [payload.post_id]: {
            ...state.postsById[payload.post_id],
            upvotes: payload.upvotes,
            downvotes: payload.downvotes,
            currentUserVote: -1
          }
        }
      };
    case REMOVE_VOTE_FROM_POST:
      // const currentUserVote = state.postsById[postId].currentUserVote;
      return {
        ...state,
        postsById: {
          ...state.postsById,
          [payload.post_id]: {
            ...state.postsById[payload.post_id],
            upvotes: payload.upvotes,
            downvotes: payload.downvotes,
            currentUserVote: 0
          }
        }
      }
    case SUBMIT_POST_SUCCESS:
      // add new post object to postsById
      return {
        ...state,
        postsById: {
          ...state.postsById,
          [payload.post_id]: payload
        }
      };
    case UPVOTE_POST_FAILURE:
    case DOWNVOTE_POST_FAILURE:
    default:
      return state;
  }
}
