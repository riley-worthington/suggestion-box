import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCommentListByPost, loadUserCommentVotes } from './commentFeedActions';
import { getCommentsAsList } from './commentFeedSelectors';
import Comment from '../Comment/Comment';
import AddComment from '../AddComment/AddComment';
import Loader from '../../Loader/Loader';
import './CommentFeed.css';

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    commentList: getCommentsAsList(state),
    loadUserCommentVotesPending: state.commentsReducer.loadUserCommentVotesPending,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCommentListByPost: postId => dispatch(loadCommentListByPost(postId)),
    loadUserCommentVotes: userId => dispatch(loadUserCommentVotes(userId)),
  }
}

class CommentFeed extends Component {
  componentDidMount() {
    const {
      postId,
      loadCommentListByPost,
      loadUserCommentVotes,
      currentUser,
    } = this.props;

    if (postId !== undefined) {
      loadCommentListByPost(postId);
    }
    loadUserCommentVotes(currentUser.user_id);
  }

  render() {
    const {
      currentUser,
      commentList,
      postId,
      loadUserCommentVotesPending,
    } = this.props;
    if (loadUserCommentVotesPending || (commentList.length > 0 && commentList[0].post_id !== postId)) {
      return (
        <Loader />
      );
    }
    return (
      <div className='comment-feed'>
        { commentList.map((commentObj, i) =>
            <Comment
              key={commentObj.comment_id}
              commentObj={commentObj}
            />
          ) }
        <AddComment currentUser={currentUser} postId={postId}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentFeed);
