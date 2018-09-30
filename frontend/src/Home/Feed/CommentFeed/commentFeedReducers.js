import { LOAD_COMMENT_LIST_REQUEST, LOAD_COMMENT_LIST_SUCCESS, LOAD_COMMENT_LIST_FAILURE } from './commentFeedConstants';
import { SUBMIT_COMMENT_REQUEST, SUBMIT_COMMENT_SUCCESS, SUBMIT_COMMENT_FAILURE } from './commentFeedConstants';

/* STORE SCHEMA

  commentsById = {
    commentId: {
      commenter: userId,
      post: postId,
      content: text,
      date: timestamp,
      upvotes: integer,
      downvotes: integer,
      currentUserVote: -1, 0, or 1,
    }
  }

*/

const initialState = {
  loadCommentListPending: false,
  pendingComment: false,
  commentsById: {}
};

export const commentsReducer = (state=initialState, action={}) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_COMMENT_LIST_REQUEST:
      return {
        ...state,
        loadCommentListPending: true
      };
    case LOAD_COMMENT_LIST_SUCCESS:
      const comments = payload.reduce((obj, comment) => {
        comment['currentUserVote'] = 0;
         obj[comment.commentId] = comment;
         return obj;
       }, {});
      return {
        ...state,
        loadCommentListPending: false,
        commentsById: comments
      }
    case LOAD_COMMENT_LIST_FAILURE:
      return {
        ...state,
        loadCommentListPending: false
      }
    case SUBMIT_COMMENT_REQUEST:
      return {
        ...state,
        pendingComment: true
      }
    case SUBMIT_COMMENT_SUCCESS:
      return {
        ...state,
        pendingComment: false,
        commentsById: {
          ...state.commentsById,
          [payload.commentId]: payload
        }
      }
    case SUBMIT_COMMENT_FAILURE:
      return {
        ...state,
        pendingComment: false
      }
    default:
      return state;
  }
}
