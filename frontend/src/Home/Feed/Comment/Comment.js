import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  upvoteComment,
  downvoteComment,
  removeVoteFromComment
} from '../CommentFeed/commentFeedActions';
import Vote from '../Vote/Vote';
import './Comment.css';

import { users } from '../../../fakeDatabase';

const mapDispatchToProps = dispatch => {
  return {
    upvoteComment: commentId => dispatch(upvoteComment(commentId)),
    downvoteComment: commentId => dispatch(downvoteComment(commentId)),
    removeVoteFromComment: commentId => dispatch(removeVoteFromComment(commentId))
  }
}

class Comment extends Component {
  render() {
    const {
      commentObj,
      upvoteComment,
      downvoteComment,
      removeVoteFromComment
    } = this.props;
    const commenter = users[commentObj.commenter];
    const commentId = commentObj.commentId;
    return (
      <article className='comment-container'>
        <Vote
          post={commentObj}
          onUpvote={() => upvoteComment(commentId)}
          onDownvote={() => downvoteComment(commentId)}
          onRemoveVote={() => removeVoteFromComment(commentId)}
        />
        <div className='comment-body'>
          <header>
            <h2 className='commenter-name'>{`${commenter.firstName} ${commenter.lastName}`}</h2>
          </header>
          <p className='comment-content'>{commentObj.content}</p>
        </div>
      </article>
    );
  }
}

export default connect(null, mapDispatchToProps)(Comment);
