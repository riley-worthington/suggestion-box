import React, { Component } from 'react';
import { connect } from 'react-redux';
import Vote from '../Vote/Vote';
import './Post.css';
import { upvotePost, downvotePost } from './postActions';
import { getPostById } from './postSelectors';

import { users } from '../../../fakeDatabase';

const mapStateToProps = (state, props) => {
  return {
    post: getPostById(state, props.postId)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upvotePost: postId => dispatch(upvotePost(postId)),
    downvotePost: postId => dispatch(downvotePost(postId))
  }
}

class Post extends Component {
  render() {
    const { postId, post, upvotePost, downvotePost } = this.props;
    const originalPoster = users[post.originalPoster];
    const opName = originalPoster.firstName + ' ' + originalPoster.lastName;
    return (
      <div className='post-malone'>
        <Vote
          post={post}
          onUpvote={() => upvotePost(postId)}
          onDownvote={() => downvotePost(postId)}
        />
        <div className='post-body'>
          <div className='title'>
            {post.title}
          </div>
          <div className='author'>
            {opName}
          </div>
          <div className='content'>
            {post.content}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
