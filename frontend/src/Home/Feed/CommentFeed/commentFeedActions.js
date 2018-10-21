import {
  LOAD_COMMENT_LIST_REQUEST,
  LOAD_COMMENT_LIST_SUCCESS,
  LOAD_COMMENT_LIST_FAILURE,
  SUBMIT_COMMENT_REQUEST,
  SUBMIT_COMMENT_SUCCESS,
  SUBMIT_COMMENT_FAILURE,
  UPVOTE_COMMENT_SUCCESS,
  // UPVOTE_COMMENT_FAILURE,
  DOWNVOTE_COMMENT_SUCCESS,
  // DOWNVOTE_COMMENT_FAILURE,
  REMOVE_VOTE_FROM_COMMENT,
} from './commentFeedConstants';


export const loadCommentListByPost = postId => dispatch => {
  // Get list of comment IDs from redux store, need a selector

  // Request comment list from backend
  dispatch(loadCommentListRequest(postId));

  fetch(`http://localhost:3000/posts/${postId}/comments`, {
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

export const submitComment = comment => dispatch => {
  const { userId, postId, content } = comment;
  dispatch(submitCommentRequest(comment));

  fetch(`http://localhost:3000/posts/${postId}/comments`, {
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

export const upvoteComment = commentId => dispatch => {
  // make API call
  console.log('upvoting', commentId);
  dispatch(upvoteCommentSuccess(commentId));

  function upvoteCommentSuccess(commentId) {
    return {
      type: UPVOTE_COMMENT_SUCCESS,
      payload: commentId
    }
  }

  // function upvoteCommentFailure(commentId) {
  //   return {
  //     type: UPVOTE_COMMENT_FAILURE,
  //     payload: commentId
  //   }
  // }
}

export const downvoteComment = commentId => dispatch => {
  // make API call, have database return updated comment object
  console.log('downvoting', commentId);
  dispatch(downvoteCommentSuccess(commentId));

  function downvoteCommentSuccess(commentId) {
    return {
      type: DOWNVOTE_COMMENT_SUCCESS,
      payload: commentId
    }
  }

  // function downvoteCommentFailure(commentId) {
  //   return {
  //     type: DOWNVOTE_COMMENT_FAILURE,
  //     payload: commentId
  //   }
  // }
}

export const removeVoteFromComment = commentId => {
  return {
    type: REMOVE_VOTE_FROM_COMMENT,
    payload: commentId
  }
}
