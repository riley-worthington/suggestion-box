import {
  LOAD_COMMENT_LIST_REQUEST,
  LOAD_COMMENT_LIST_SUCCESS,
  LOAD_COMMENT_LIST_FAILURE,
  SUBMIT_COMMENT_REQUEST,
  SUBMIT_COMMENT_SUCCESS,
  SUBMIT_COMMENT_FAILURE,
  UPVOTE_COMMENT_SUCCESS,
  // UPVOTE_COMMENT_FAILURE,
  DOWNVOTE_COMMENT_SUCCESS,
  // DOWNVOTE_COMMENT_FAILURE,
  REMOVE_VOTE_FROM_COMMENT,
} from './commentFeedConstants';

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
         obj[comment.comment_id] = comment;
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
    case UPVOTE_COMMENT_SUCCESS:
      const currentUpvotes = state.commentsById[payload].upvotes;
      return {
        ...state,
        commentsById: {
          ...state.commentsById,
          [payload]: {
            ...state.commentsById[payload],
            upvotes: currentUpvotes + 1,
            currentUserVote: 1
          }
        }
      };
    case DOWNVOTE_COMMENT_SUCCESS:
      const currentDownvotes = state.commentsById[payload].downvotes;
      return {
        ...state,
        commentsById: {
          ...state.commentsById,
          [payload]: {
            ...state.commentsById[payload],
            downvotes: currentDownvotes + 1,
            currentUserVote: -1
          }
        }
      };
    case REMOVE_VOTE_FROM_COMMENT:
      const currentUserVote = state.commentsById[payload].currentUserVote;
      if (currentUserVote === -1) {
        return {
          ...state,
          commentsById: {
            ...state.commentsById,
            [payload]: {
              ...state.commentsById[payload],
              downvotes: state.commentsById[payload].downvotes - 1,
              currentUserVote: 0
            }
          }
        };
      } else if (currentUserVote === 1) {
        return {
          ...state,
          commentsById: {
            ...state.commentsById,
            [payload]: {
              ...state.commentsById[payload],
              upvotes: state.commentsById[payload].upvotes - 1,
              currentUserVote: 0
            }
          }
        };
      }
      return state;
    default:
      return state;
  }
}
