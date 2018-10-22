import {
  GET_ALL_TEAMS_REQUEST,
  GET_ALL_TEAMS_SUCCESS,
  GET_ALL_TEAMS_FAILURE,
} from './joinPageConstants';

export const getAllTeams = () => dispatch => {
  dispatch(getAllTeamsRequest());

  fetch('http://localhost:3000/teams', {
    method: 'get'
  })
  .then(response => response.json())
  .then(teams => {
    if (teams) {
      dispatch(getAllTeamsSuccess(teams));
    } else {
      dispatch(getAllTeamsFailure('could not load teams'));
    }
  })

  function getAllTeamsRequest() {
    return {
      type: GET_ALL_TEAMS_REQUEST,
      payload: null
    }
  }

  function getAllTeamsSuccess(teams) {
    return {
      type: GET_ALL_TEAMS_SUCCESS,
      payload: teams
    }
  }

  function getAllTeamsFailure(error) {
    return {
      type: GET_ALL_TEAMS_FAILURE,
      payload: error
    }
  }
}
