import {
  GET_USER_TEAMS_REQUEST,
  GET_USER_TEAMS_SUCCESS,
  GET_USER_TEAMS_FAILURE,
} from './homeConstants';

export const getUserTeams = userId => dispatch => {
  dispatch(getUserTeamsRequest(userId));

  fetch(`http://localhost:3000/users/${userId}/teams`, {
    method: 'get'
  })
  .then(response => response.json())
  .then(teams => {
    console.log(teams);
    if (teams[0]) {
      dispatch(getUserTeamsSuccess(teams));
    } else {
      dispatch(getUserTeamsFailure('Failed to load teams'));
    }
  })
}

function getUserTeamsRequest(userId) {
  return {
    type: GET_USER_TEAMS_REQUEST,
    payload: userId
  }
}
function getUserTeamsSuccess(teams) {
  return {
    type: GET_USER_TEAMS_SUCCESS,
    payload: teams
  }
}
function getUserTeamsFailure(error) {
  return {
    type: GET_USER_TEAMS_FAILURE,
    payload: error
  }
}