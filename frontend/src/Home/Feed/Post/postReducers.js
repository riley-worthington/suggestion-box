import { UPVOTE_POST_SUCCESS, UPVOTE_POST_FAILURE, DOWNVOTE_POST_SUCCESS, DOWNVOTE_POST_FAILURE, REMOVE_VOTE_FROM_POST } from './postConstants';
import { LOAD_POST_LIST_SUCCESS, SUBMIT_POST_SUCCESS } from '../PostFeed/postFeedConstants';
import { SUBMIT_COMMENT_SUCCESS } from '../CommentFeed/commentFeedConstants';

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
      comments: array of commentIds
    }
  }

*/

const initialState = {};

export const postsById = (state=initialState, action={}) => {
  const { type, payload } = action;

  // payload could be a postList or postId
  const postList = payload;
  const postId = payload;

  switch (type) {
    case LOAD_POST_LIST_SUCCESS:
      const posts = postList.reduce((obj, post) => {
        post['currentUserVote'] = 0;
         obj[post.post_id] = post;
         return obj;
       }, {});
      return {
        ...state,
        postsById: posts
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
    case SUBMIT_COMMENT_SUCCESS:
      // insert commentId into comment list on corresponding post
      return {
        ...state,
        postsById: {
          ...state.postsById,
          [payload.post]: {
            ...state.postsById[payload.post],
            comments: [
              ...state.postsById[payload.post].comments,
              payload.commentId
            ]
          }
        }
      }
    case UPVOTE_POST_FAILURE:
    case DOWNVOTE_POST_FAILURE:
    default:
      return state;
  }
}
