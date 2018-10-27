import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCommentListByPost } from './commentFeedActions';
import { getCommentsAsList } from './commentFeedSelectors';
import Comment from '../Comment/Comment';
import AddComment from '../AddComment/AddComment';
import Loader from '../../Loader/Loader';
import './CommentFeed.css';

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    commentList: getCommentsAsList(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCommentListByPost: postId => dispatch(loadCommentListByPost(postId)),
  }
}

class CommentFeed extends Component {
  componentDidMount() {
    const {
      postId,
      loadCommentListByPost,
    } = this.props;

    if (postId !== undefined) {
      loadCommentListByPost(postId);
    }
  }

  render() {
    const { currentUser, commentList, postId } = this.props;
    if (commentList.length > 0 && commentList[0].post_id !== postId) {
      console.log(commentList.length, commentList[0].post_id, postId);
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
