import {
  UPVOTE_POST_SUCCESS,
  UPVOTE_POST_FAILURE,
  DOWNVOTE_POST_SUCCESS,
  DOWNVOTE_POST_FAILURE,
  REMOVE_VOTE_FROM_POST,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
} from './postConstants';


export const loadPostById = (postId) => dispatch => {
  dispatch(loadPostRequest(postId));

  fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
    method: 'get'
  })
  .then(response => response.json())
  .then(post => {
    if (post.post_id) {
      dispatch(loadPostSuccess(post));
    } else {
      dispatch(loadPostFailure(post));
    }
  })
  .catch(err => {
    dispatch(loadPostFailure(err));
  })

  function loadPostRequest(postId) {
    return {
      type: LOAD_POST_REQUEST,
      payload: postId
    }
  }
  function loadPostSuccess(post) {
    return {
      type: LOAD_POST_SUCCESS,
      payload: post
    }
  }
  function loadPostFailure(error) {
    return {
      type: LOAD_POST_FAILURE,
      payload: error
    }
  }
}

export const upvotePost = (userId, postId) => dispatch => {
  // make API call
  fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/vote?dir=1`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userId
    })
  })
  .then(response => response.json())
  .then(post => {
    if (post.post_id) {
      dispatch(upvotePostSuccess(post));
    } else {
      throw post;
    }
  })
  .catch(error => {
    dispatch(upvotePostFailure(error));
  })


  function upvotePostSuccess(post) {
    return {
      type: UPVOTE_POST_SUCCESS,
      payload: post
    }
  }

  function upvotePostFailure(error) {
    return {
      type: UPVOTE_POST_FAILURE,
      payload: error
    }
  }
}

export const downvotePost = (userId, postId) => dispatch => {
  // make API call
  fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/vote?dir=-1`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userId
    })
  })
  .then(response => response.json())
  .then(post => {
    if (post.post_id) {
      dispatch(downvotePostSuccess(post));
    } else {
      throw post;
    }
  })
  .catch(error => {
    dispatch(downvotePostFailure(error));
  })

  function downvotePostSuccess(post) {
    return {
      type: DOWNVOTE_POST_SUCCESS,
      payload: post
    }
  }

  function downvotePostFailure(error) {
    return {
      type: DOWNVOTE_POST_FAILURE,
      payload: error
    }
  }
}

export const removeVoteFromPost = (userId, postId) => dispatch => {
  // make API call
  fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/vote?dir=0`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userId
    })
  })
  .then(response => response.json())
  .then(post => {
    if (post.post_id) {
      dispatch(removeVoteFromPostSuccess(post));
    } else {
      throw post;
    }
  })
  .catch(error => {
    console.log(error);
  })

  function removeVoteFromPostSuccess(post) {
    return {
      type: REMOVE_VOTE_FROM_POST,
      payload: post
    }
  }
}
