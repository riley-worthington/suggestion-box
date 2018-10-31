import {
  GET_USER_TEAMS_REQUEST,
  GET_USER_TEAMS_SUCCESS,
  GET_USER_TEAMS_FAILURE,
  TOGGLE_COLOR_THEME,
} from './homeConstants';
import {
  ADD_TEAM_MEMBER_SUCCESS
} from './JoinPage/joinPageConstants';

const LIGHT = 'LIGHT';
const DARK = 'DARK';

const initialState = {
  getUserTeamsPending: false,
  userTeams: null,
  theme: LIGHT,
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
    case TOGGLE_COLOR_THEME:
      const currentTheme = state.theme;
      if (currentTheme === DARK) {
        return {
          ...state,
          theme: LIGHT
        }
      } else {
        return {
          ...state,
          theme: DARK
        }
      }
    default:
      return state;
  }
}
