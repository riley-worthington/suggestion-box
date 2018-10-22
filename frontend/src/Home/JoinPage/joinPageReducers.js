import {
  GET_ALL_TEAMS_REQUEST,
  GET_ALL_TEAMS_SUCCESS,
  GET_ALL_TEAMS_FAILURE,
} from './joinPageConstants';

const initialState = {
  getAllTeamsPending: false,
  teams: []
}

export const join = (state=initialState, action={}) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_TEAMS_REQUEST:
      return {
        ...state,
        getAllTeamsPending: true
      }
    case GET_ALL_TEAMS_SUCCESS:
      return {
        ...state,
        getAllTeamsPending: false,
        teams: payload
      }
    case GET_ALL_TEAMS_FAILURE:
      return {
        ...state,
        getAllTeamsPending: false
      }
    default:
      return state;
  }
}
