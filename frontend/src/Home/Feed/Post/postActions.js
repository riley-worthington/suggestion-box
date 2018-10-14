import {
  UPVOTE_POST_SUCCESS,
  UPVOTE_POST_FAILURE,
  DOWNVOTE_POST_SUCCESS,
  DOWNVOTE_POST_FAILURE,
  REMOVE_VOTE_FROM_POST
} from './postConstants';

// import { posts, userVotes } from '../../../fakeDatabase';

export const upvotePost = (userId, postId) => dispatch => {
  // make API call
  fetch(`http://localhost:3000/posts/${postId}/vote?dir=1`, {
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
  fetch(`http://localhost:3000/posts/${postId}/vote?dir=-1`, {
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
  fetch(`http://localhost:3000/posts/${postId}/vote?dir=0`, {
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
