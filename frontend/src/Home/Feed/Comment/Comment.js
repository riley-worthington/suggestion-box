import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  upvoteComment,
  downvoteComment,
  removeVoteFromComment
} from '../CommentFeed/commentFeedActions';
import { getUserById } from '../PostFeed/postFeedSelectors';
import Vote from '../Vote/Vote';
import './Comment.css';


const mapStateToProps = (state, ownProps) => {
  const { commentObj } = ownProps;
  return {
    currentUser: state.auth.currentUser,
    commenter: getUserById(state, commentObj.user_id),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upvoteComment: (userId, commentId) =>
      dispatch(upvoteComment(userId, commentId)),
    downvoteComment: (userId, commentId) =>
      dispatch(downvoteComment(userId, commentId)),
    removeVoteFromComment: (userId, commentId) =>
      dispatch(removeVoteFromComment(userId, commentId)),
  }
}

class Comment extends Component {
  render() {
    const {
      currentUser,
      commentObj,
      upvoteComment,
      downvoteComment,
      removeVoteFromComment,
      commenter,
    } = this.props;
    const userId = currentUser.user_id;
    const commentId = commentObj.comment_id;

    const date = new Date(commentObj.time_posted);
    const offset = new Date() - date;
    const daysAgo = Math.floor(offset / 8.64e7);
    const hoursAgo = Math.floor(offset / 3.6e6);
    const minutesAgo = Math.floor(offset / 6e4);

    let timeMessage;
    if (hoursAgo < 1) {
      timeMessage = minutesAgo === 1 ? `${minutesAgo} minute ago` : `${minutesAgo} minutes ago`
    } else if (daysAgo < 1){
      timeMessage = hoursAgo === 1 ? `${hoursAgo} hour ago` : `${hoursAgo} hours ago`;
    } else {
      timeMessage = daysAgo === 1 ? `${daysAgo} day ago` : `${daysAgo} days ago`
    }

    return (
      <article className='comment-container'>
        <Vote
          post={commentObj}
          onUpvote={() => upvoteComment(userId, commentId)}
          onDownvote={() => downvoteComment(userId, commentId)}
          onRemoveVote={() => removeVoteFromComment(userId, commentId)}
        />
        <div className='comment-body'>
          <header className='comment-info'>
            <h2 className='commenter-name'>{`${commenter.first_name} ${commenter.last_name}`}</h2>
          </header>
          <p className='comment-content'>{commentObj.content}</p>
          <p className='comment-time'>{timeMessage}</p>
        </div>
      </article>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
