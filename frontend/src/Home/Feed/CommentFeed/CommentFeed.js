import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCommentListByPost } from './commentFeedActions';
import { getCommentsAsList } from './commentFeedSelectors';
import Comment from '../Comment/Comment';
import AddComment from '../AddComment/AddComment';
import './CommentFeed.css';

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    commentList: getCommentsAsList(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCommentListByPost: postId => dispatch(loadCommentListByPost(postId))
  }
}

class CommentFeed extends Component {
  componentDidMount() {
    // get posts
    const { currentUser, loadCommentListByPost, postId } = this.props;

    if (postId !== undefined) {
      loadCommentListByPost(postId);
    }
  }

  render() {
    const { currentUser, commentList, postId } = this.props;
    console.log(commentList)
    return (
      <div className='comment-feed'>
        { commentList.map((commentObj, i) =>
            <Comment
              key={commentObj.commentId}
              commentObj={commentObj}
            />
          ) }
        <AddComment currentUser={currentUser} postId={postId}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentFeed);
