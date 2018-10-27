import {
  LOAD_COMMENT_LIST_REQUEST,
  LOAD_COMMENT_LIST_SUCCESS,
  LOAD_COMMENT_LIST_FAILURE,
  LOAD_USER_COMMENT_VOTES_REQUEST,
  LOAD_USER_COMMENT_VOTES_SUCCESS,
  LOAD_USER_COMMENT_VOTES_FAILURE,
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
  commentsById: {},
  userCommentVotes: null,
  loadUserCommentVotesPending: false,
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
    case LOAD_USER_COMMENT_VOTES_REQUEST:
      return {
        ...state,
        loadUserCommentVotesPending: true
      }
    case LOAD_USER_COMMENT_VOTES_SUCCESS:
      const userCommentVotes = payload.reduce((obj, vote) => {
        obj[vote.comment_id] = vote;
        return obj;
       }, {});
      return {
        ...state,
        userCommentVotes: userCommentVotes,
        loadUserCommentVotesPending: false
      }
    case LOAD_USER_COMMENT_VOTES_FAILURE:
      return {
        ...state,
        loadUserCommentVotesPending: false
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
          [payload.comment_id]: payload
        }
      }
    case SUBMIT_COMMENT_FAILURE:
      return {
        ...state,
        pendingComment: false
      }
    case UPVOTE_COMMENT_SUCCESS:
      return {
        ...state,
        commentsById: {
          ...state.commentsById,
          [payload.comment_id]: {
            ...state.commentsById[payload.comment_id],
            upvotes: payload.upvotes,
            downvotes: payload.downvotes,
            currentUserVote: 1
          }
        },
        userCommentVotes: {
          ...state.userCommentVotes,
          [payload.comment_id]: {
            ...state.userCommentVotes[payload.comment_id],
            user_vote: true
          }
        }
      };
    case DOWNVOTE_COMMENT_SUCCESS:
      return {
        ...state,
        commentsById: {
          ...state.commentsById,
          [payload.comment_id]: {
            ...state.commentsById[payload.comment_id],
            upvotes: payload.upvotes,
            downvotes: payload.downvotes,
            currentUserVote: -1
          }
        },
        userCommentVotes: {
          ...state.userCommentVotes,
          [payload.comment_id]: {
            ...state.userCommentVotes[payload.comment_id],
            user_vote: false
          }
        }
      };
    case REMOVE_VOTE_FROM_COMMENT:
      return {
        ...state,
        commentsById: {
          ...state.commentsById,
          [payload.comment_id]: {
            ...state.commentsById[payload.comment_id],
            upvotes: payload.upvotes,
            downvotes: payload.downvotes,
            currentUserVote: 0
          }
        },
        userCommentVotes: {
          ...state.userCommentVotes,
          [payload.comment_id]: {
            ...state.userCommentVotes[payload.comment_id],
            user_vote: null
          }
        }
      }
    default:
      return state;
  }
}
