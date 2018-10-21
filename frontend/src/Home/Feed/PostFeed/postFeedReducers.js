import {
  LOAD_POST_LIST_REQUEST,
  LOAD_POST_LIST_SUCCESS,
  LOAD_POST_LIST_FAILURE,
  SUBMIT_POST_REQUEST,
  SUBMIT_POST_SUCCESS,
  SUBMIT_POST_FAILURE,
  LOAD_TEAM_MEMBERS_REQUEST,
  LOAD_TEAM_MEMBERS_SUCCESS,
  LOAD_TEAM_MEMBERS_FAILURE,
  LOAD_USER_VOTES_REQUEST,
  LOAD_USER_VOTES_SUCCESS,
  LOAD_USER_VOTES_FAILURE,
 } from './postFeedConstants';
 import {
   LOAD_POST_SUCCESS,
   UPVOTE_POST_SUCCESS,
   DOWNVOTE_POST_SUCCESS,
   REMOVE_VOTE_FROM_POST,
 } from '../Post/postConstants';

/* STORE SCHEMA

  postList = {
    loadPostListPending: boolean,
    postList: array of postIds,
    pendingPost: boolean,
    newPost: post object?,
    selectedTeam: teamId,
    teamMembersById: {
      userId: {
        id,
        firstName,
        lastName
      }
    }
  }

*/

const initialState = {
  loadPostListPending: false,
  loadTeamMembersPending: false,
  postList: [],
  pendingPost: false,
  newPost: null,
  selectedTeam: null,
  teamMembersById: {},
  userVotes: {},
  loadUserVotesPending: false,
}

export const feed = (state=initialState, action={}) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_POST_LIST_REQUEST:
      return {
        ...state,
        loadPostListPending: true,
        selectedTeam: payload
      };
    case LOAD_POST_LIST_SUCCESS:
      const postIds = payload.map(post => post.post_id)
      return  {
        ...state,
        loadPostListPending: false,
        postList: postIds
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
      return {
        ...state,
        pendingPost: false,
        postList: [...state.postList, payload.post_id]
      };
    case SUBMIT_POST_FAILURE:
      return {
        ...state,
        pendingPost: false
      };
    case LOAD_TEAM_MEMBERS_REQUEST:
      return {
        ...state,
        loadTeamMembersPending: true
      }
    case LOAD_TEAM_MEMBERS_SUCCESS:
      const users = payload.reduce((obj, user) => {
        obj[user.user_id] = user;
        return obj;
       }, {});
      return {
        ...state,
        teamMembersById: users,
        loadTeamMembersPending: false
      }
    case LOAD_TEAM_MEMBERS_FAILURE:
      return {
        ...state,
        loadTeamMembersPending: false
      }
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        selectedTeam: payload.team_id
      }
    case LOAD_USER_VOTES_REQUEST:
      return {
        ...state,
        loadUserVotesPending: true
      }
    case LOAD_USER_VOTES_SUCCESS:
      const userVotes = payload.reduce((obj, vote) => {
        obj[vote.post_id] = vote;
        return obj;
       }, {});
      return {
        ...state,
        userVotes: userVotes,
        loadUserVotesPending: false
      }
    case LOAD_USER_VOTES_FAILURE:
      return {
        ...state,
        loadUserVotesPending: false
      }
    case UPVOTE_POST_SUCCESS:
      return {
        ...state,
        userVotes: {
          ...state.userVotes,
          [payload.post_id]: {
            ...state.userVotes[payload.post_id],
            user_vote: true
          }
        }
      }
    case DOWNVOTE_POST_SUCCESS:
      return {
        ...state,
        userVotes: {
          ...state.userVotes,
          [payload.post_id]: {
            ...state.userVotes[payload.post_id],
            user_vote: false
          }
        }
      }
    case REMOVE_VOTE_FROM_POST:
      return {
        ...state,
        userVotes: {
          ...state.userVotes,
          [payload.post_id]: {
            ...state.userVotes[payload.post_id],
            user_vote: null
          }
        }
      }
    default:
      return state;
  }
}
