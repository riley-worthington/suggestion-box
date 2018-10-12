import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Vote from '../Vote/Vote';
import './Post.css';
import { upvotePost, downvotePost, removeVoteFromPost } from './postActions';
import { getPostById } from './postSelectors';
import { getUserById } from '../PostFeed/postFeedSelectors';

import { users } from '../../../fakeDatabase';

const mapStateToProps = (state, props) => {
  const post = getPostById(state, props.postId);
  console.log('post', post)
  return {
    post: post,
    originalPoster: getUserById(state, post.originalPoster)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upvotePost: postId => dispatch(upvotePost(postId)),
    downvotePost: postId => dispatch(downvotePost(postId)),
    removeVoteFromPost: postId => dispatch(removeVoteFromPost(postId))
  }
}

class Post extends Component {
  render() {
    const {
      postId,
      post,
      originalPoster,
      upvotePost,
      downvotePost,
      removeVoteFromPost
    } = this.props;
    const opName = originalPoster.first_name + ' ' + originalPoster.last_name;
    const numComments = post.comments.length;
    return (
      <article className='post-malone'>
        <Vote
          post={post}
          onUpvote={() => upvotePost(postId)}
          onDownvote={() => downvotePost(postId)}
          onRemoveVote={() => removeVoteFromPost(postId)}
        />
        <div className='post-body'>
          <header>
            <h1 className='title'>
              <Link
                to={`/posts/${postId}`}
                className='post-link'
              >
                {post.title}
              </Link>
            </h1>
            <h2 className='author'>
              {opName}
            </h2>
          </header>
          <p className='content'>
            {post.content}
          </p>
          <p className='comments-tag'>
            <Link
              to={`/posts/${postId}`}
              className='comments-tag' >
              {numComments + (numComments === 1 ? ' comment' : ' comments')}
            </Link>
          </p>
        </div>
      </article>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
