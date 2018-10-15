import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentFeed from '../CommentFeed/CommentFeed';
import './PostPage.css';
import Post from '../Post/Post';
import { getPostById } from '../Post/postSelectors';

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps;
  return {
    postObj: getPostById(state, postId)
  }
}

class PostPage extends Component {
  render() {
    const { postObj, postId } = this.props;
    return (
      <div className='post-page'>
        <Post postObj={postObj} />
        <CommentFeed postId={postId} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(PostPage);
