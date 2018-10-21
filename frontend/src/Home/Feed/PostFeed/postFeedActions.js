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

import { posts, userVotes } from '../../../fakeDatabase';

// What the postList would look like coming from the API
const samplePostList = [
  posts[1],
  posts[2]
]

export const loadPostListByTeam = teamId => dispatch => {
  dispatch(loadPostListRequest(teamId));

  // Request team post list from backend
  fetch(`http://localhost:3000/teams/${teamId}/posts`, {
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

  // dispatch(loadPostListSuccess(samplePostList));
}

export const loadPostListByUser = userId => dispatch => {
  // Request user post list from backend
  dispatch(loadPostListSuccess(samplePostList));
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

  fetch(`http://localhost:3000/teams/${teamId}/members`, {
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
  fetch('http://localhost:3000/posts', {
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

export const loadUserVotes = userId => dispatch => {
  dispatch(loadUserVotesRequest(userId));

  fetch(`http://localhost:3000/users/${userId}/votes`, {
    method: 'get'
  })
  .then(response => response.json())
  .then(userVotes => {
    if (userVotes.constructor === Array) {
      dispatch(loadUserVotesSuccess(userVotes));
    } else {
      dispatch(loadUserVotesFailure(userVotes));
    }
  })

  function loadUserVotesRequest(userId) {
    return {
      type: LOAD_USER_VOTES_REQUEST,
      payload: userId
    }
  }

  function loadUserVotesSuccess(userVotes) {
    return {
      type: LOAD_USER_VOTES_SUCCESS,
      payload: userVotes
    }
  }

  function loadUserVotesFailure(error) {
    return {
      type: LOAD_USER_VOTES_FAILURE,
      payload: error
    }
  }
}
