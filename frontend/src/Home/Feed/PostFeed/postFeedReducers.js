import {
  LOAD_POST_LIST_REQUEST,
  LOAD_POST_LIST_SUCCESS,
  LOAD_POST_LIST_FAILURE,
  SUBMIT_POST_REQUEST,
  SUBMIT_POST_SUCCESS,
  SUBMIT_POST_FAILURE,
  LOAD_TEAM_MEMBERS_REQUEST,
  LOAD_TEAM_MEMBERS_SUCCESS,
  LOAD_TEAM_MEMBERS_FAILURE
 } from './postFeedConstants';

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
  teamMembersById: {}
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
      console.log(payload.post_id);
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
