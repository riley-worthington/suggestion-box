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
  LOAD_USER_POST_VOTES_REQUEST,
  LOAD_USER_POST_VOTES_SUCCESS,
  LOAD_USER_POST_VOTES_FAILURE,
  SET_POST_FEED_FILTER,
 } from './postFeedConstants';


export const loadPostListByTeam = teamId => dispatch => {
  dispatch(loadPostListRequest(teamId));

  // Request team post list from backend
  fetch(`${process.env.REACT_APP_API_URL}/teams/${teamId}/posts`, {
    method: 'get'
  })
  .then(response => response.json())
  .then(postList => {
    if (postList) {
      dispatch(loadPostListSuccess(postList));
    } else {
      dispatch(loadPostListFailure('failed'));
    }
  })
}

export const loadPostListByUser = userId => dispatch => {
  // Request user post list from backend
  console.log('not implemented yet');
}

const loadPostListRequest = teamId => {
  return {
    type: LOAD_POST_LIST_REQUEST,
    payload: teamId
  }
}

const loadPostListSuccess = postList => {
  return {
    type: LOAD_POST_LIST_SUCCESS,
    payload: postList
  }
}

const loadPostListFailure = error => {
  return {
    type: LOAD_POST_LIST_FAILURE,
    payload: error
  }
}

export const loadTeamMembers = teamId => dispatch => {
  dispatch(loadTeamMembersRequest(teamId));

  fetch(`${process.env.REACT_APP_API_URL}/teams/${teamId}/members`, {
    method: 'get'
  })
  .then(response => response.json())
  .then(teamMembers => {
    if (teamMembers) {
      dispatch(loadTeamMembersSuccess(teamMembers));
    } else {
      dispatch(loadTeamMembersFailure('Could not load team members'));
    }
  })

  function loadTeamMembersRequest(teamId) {
    return {
      type: LOAD_TEAM_MEMBERS_REQUEST,
      payload: teamId
    }
  }

  function loadTeamMembersSuccess(teamMembers) {
    return {
      type: LOAD_TEAM_MEMBERS_SUCCESS,
      payload: teamMembers
    }
  }

  function loadTeamMembersFailure(error) {
    return {
      type: LOAD_TEAM_MEMBERS_FAILURE,
      payload: error
    }
  }
}


export const submitPost = post => dispatch => {
  const { userId, teamId, title, content } = post;
  console.log(userId, teamId, title, content)
  dispatch(submitPostRequest(post));
  fetch(`${process.env.REACT_APP_API_URL}/posts`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userId,
      teamId: teamId,
      title: title,
      content: content
    })
  })
  .then(response => response.json())
  .then(post => {
    if (post.post_id) {
      dispatch(submitPostSuccess(post));
    } else {
      dispatch(submitPostFailure(post));
    }
  })

  function submitPostRequest(post) {
    return {
      type: SUBMIT_POST_REQUEST,
      payload: post
    }
  }

  function submitPostSuccess(post) {
    return {
      type: SUBMIT_POST_SUCCESS,
      payload: post
    }
  }

  function submitPostFailure(error) {
    return {
      type: SUBMIT_POST_FAILURE,
      payload: error
    }
  }
}

export const loadUserPostVotes = userId => dispatch => {
  dispatch(loadUserPostVotesRequest(userId));

  fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/postVotes`, {
    method: 'get'
  })
  .then(response => response.json())
  .then(userVotes => {
    if (userVotes.constructor === Array) {
      dispatch(loadUserPostVotesSuccess(userVotes));
    } else {
      dispatch(loadUserPostVotesFailure(userVotes));
    }
  })

  function loadUserPostVotesRequest(userId) {
    return {
      type: LOAD_USER_POST_VOTES_REQUEST,
      payload: userId
    }
  }

  function loadUserPostVotesSuccess(userVotes) {
    return {
      type: LOAD_USER_POST_VOTES_SUCCESS,
      payload: userVotes
    }
  }

  function loadUserPostVotesFailure(error) {
    return {
      type: LOAD_USER_POST_VOTES_FAILURE,
      payload: error
    }
  }
}

export const setPostFeedFilter = filter => ({
  type: SET_POST_FEED_FILTER,
  payload: filter
})
