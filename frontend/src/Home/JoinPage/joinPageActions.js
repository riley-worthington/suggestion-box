import {
  GET_ALL_TEAMS_REQUEST,
  GET_ALL_TEAMS_SUCCESS,
  GET_ALL_TEAMS_FAILURE,
  ADD_TEAM_MEMBER_REQUEST,
  ADD_TEAM_MEMBER_SUCCESS,
  ADD_TEAM_MEMBER_FAILURE,
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

export const addTeamMember = (userId, teamId) => dispatch => {
  dispatch(addTeamMemberRequest(teamId));

  fetch(`http://localhost:3000/teams/${teamId}/members`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userId
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.team_id === teamId && data.user_id === userId) {
      dispatch(addTeamMemberSuccess(data));
    } else {
      dispatch(addTeamMemberFailure(data));
    }
  })

  function addTeamMemberRequest(teamId) {
    return {
      type: ADD_TEAM_MEMBER_REQUEST,
      payload: teamId
    }
  }

  function addTeamMemberSuccess(data) {
    return {
      type: ADD_TEAM_MEMBER_SUCCESS,
      payload: data
    }
  }

  function addTeamMemberFailure(error) {
    return {
      type: ADD_TEAM_MEMBER_FAILURE,
      payload: error
    }
  }
}
