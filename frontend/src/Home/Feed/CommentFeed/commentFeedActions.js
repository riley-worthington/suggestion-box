import {
  LOAD_COMMENT_LIST_REQUEST,
  LOAD_COMMENT_LIST_SUCCESS,
  LOAD_COMMENT_LIST_FAILURE,
  LOAD_USER_COMMENT_VOTES_REQUEST,
  LOAD_USER_COMMENT_VOTES_SUCCESS,
  LOAD_USER_COMMENT_VOTES_FAILURE,
  SUBMIT_COMMENT_REQUEST,
  SUBMIT_COMMENT_SUCCESS,
  SUBMIT_COMMENT_FAILURE,
  UPVOTE_COMMENT_SUCCESS,
  UPVOTE_COMMENT_FAILURE,
  DOWNVOTE_COMMENT_SUCCESS,
  DOWNVOTE_COMMENT_FAILURE,
  REMOVE_VOTE_FROM_COMMENT,
} from './commentFeedConstants';


export const loadCommentListByPost = postId => dispatch => {
  // Get list of comment IDs from redux store, need a selector

  // Request comment list from backend
  dispatch(loadCommentListRequest(postId));

  fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments`, {
    method: 'get'
  })
  .then(response => response.json())
  .then(commentList => {
    if (commentList) {
      dispatch(loadCommentListSuccess(commentList));
    } else {
      dispatch(loadCommentListFailure('failed'));
    }
  })


  function loadCommentListRequest(postId) {
    return {
      type: LOAD_COMMENT_LIST_REQUEST,
      payload: postId
    }
  }

  // the payload is the actual list of comment objects
  function loadCommentListSuccess(commentList) {
    return {
      type: LOAD_COMMENT_LIST_SUCCESS,
      payload: commentList
    }
  }

  function loadCommentListFailure(error) {
    return {
      type: LOAD_COMMENT_LIST_FAILURE,
      payload: error
    }
  }
}

export const loadUserCommentVotes = userId => dispatch => {
  dispatch(loadUserCommentVotesRequest(userId));

  fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/commentVotes`, {
    method: 'get'
  })
  .then(response => response.json())
  .then(userVotes => {
    if (userVotes.constructor === Array) {
      dispatch(loadUserCommentVotesSuccess(userVotes));
    } else {
      dispatch(loadUserCommentVotesFailure(userVotes));
    }
  })

  function loadUserCommentVotesRequest(userId) {
    return {
      type: LOAD_USER_COMMENT_VOTES_REQUEST,
      payload: userId
    }
  }

  function loadUserCommentVotesSuccess(userVotes) {
    return {
      type: LOAD_USER_COMMENT_VOTES_SUCCESS,
      payload: userVotes
    }
  }

  function loadUserCommentVotesFailure(error) {
    return {
      type: LOAD_USER_COMMENT_VOTES_FAILURE,
      payload: error
    }
  }
}

export const submitComment = comment => dispatch => {
  const { userId, postId, content } = comment;
  dispatch(submitCommentRequest(comment));

  fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userId,
      content: content
    })
  })
  .then(response => response.json())
  .then(comment => {
    if (comment) {
      dispatch(submitCommentSuccess(comment));
    } else {
      dispatch(submitCommentFailure('failed to add comment'))
    }
  })


  function submitCommentRequest(comment) {
    return {
      type: SUBMIT_COMMENT_REQUEST,
      payload: comment
    }
  }

  function submitCommentSuccess(comment) {
    return {
      type: SUBMIT_COMMENT_SUCCESS,
      payload: comment
    }
  }

  function submitCommentFailure(error) {
    return {
      type: SUBMIT_COMMENT_FAILURE,
      payload: error
    }
  }
}

export const upvoteComment = (userId, commentId) => dispatch => {
  fetch(`${process.env.REACT_APP_API_URL}/comments/${commentId}/vote?dir=1`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userId
    })
  })
  .then(response => response.json())
  .then(comment => {
    if (comment.comment_id) {
      dispatch(upvoteCommentSuccess(comment));
    } else {
      throw comment;
    }
  })
  .catch(error => {
    dispatch(upvoteCommentFailure(error));
  })

  function upvoteCommentSuccess(comment) {
    return {
      type: UPVOTE_COMMENT_SUCCESS,
      payload: comment
    }
  }

  function upvoteCommentFailure(error) {
    return {
      type: UPVOTE_COMMENT_FAILURE,
      payload: error
    }
  }
}

export const downvoteComment = (userId, commentId) => dispatch => {
  fetch(`${process.env.REACT_APP_API_URL}/comments/${commentId}/vote?dir=-1`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userId
    })
  })
  .then(response => response.json())
  .then(comment => {
    if (comment.comment_id) {
      dispatch(downvoteCommentSuccess(comment));
    } else {
      throw comment;
    }
  })
  .catch(error => {
    dispatch(downvoteCommentFailure(error));
  })

  function downvoteCommentSuccess(comment) {
    return {
      type: DOWNVOTE_COMMENT_SUCCESS,
      payload: comment
    }
  }

  function downvoteCommentFailure(error) {
    return {
      type: DOWNVOTE_COMMENT_FAILURE,
      payload: error
    }
  }
}

export const removeVoteFromComment = (userId, commentId) => dispatch => {
  fetch(`${process.env.REACT_APP_API_URL}/comments/${commentId}/vote?dir=0`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userId
    })
  })
  .then(response => response.json())
  .then(comment => {
    if (comment.comment_id) {
      dispatch(removeVoteFromCommentSuccess(comment));
    } else {
      throw comment;
    }
  })
  .catch(error => {
    console.log(error);
  })

  function removeVoteFromCommentSuccess(comment) {
    return {
      type: REMOVE_VOTE_FROM_COMMENT,
      payload: comment
    }
  }
}
