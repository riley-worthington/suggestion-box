import {
  GET_USER_TEAMS_REQUEST,
  GET_USER_TEAMS_SUCCESS,
  GET_USER_TEAMS_FAILURE,
} from './homeConstants';
import {
  ADD_TEAM_MEMBER_SUCCESS
} from './JoinPage/joinPageConstants';

const initialState = {
  getUserTeamsPending: false,
  userTeams: null
}

export const home = (state=initialState, action={}) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_TEAMS_REQUEST:
      return {
        ...state,
        getUserTeamsPending: true
      }
    case GET_USER_TEAMS_SUCCESS:
      const teams = payload.reduce((obj, team) => {
        obj[team.team_id] = team;
        return obj;
       }, {});
      return {
        ...state,
        userTeams: teams,
        getUserTeamsPending: false
      }
    case GET_USER_TEAMS_FAILURE:
      return {
        ...state,
        getUserTeamsPending: false
      }
    case ADD_TEAM_MEMBER_SUCCESS:
      return {
        ...state,
        userTeams: {
          ...state.userTeams,
          [payload.team_id]: payload
        }
      }
    default:
      return state;
  }
}
