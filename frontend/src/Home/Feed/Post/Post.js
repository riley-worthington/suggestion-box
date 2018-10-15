import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Vote from '../Vote/Vote';
import './Post.css';
import { upvotePost, downvotePost, removeVoteFromPost } from './postActions';
import { getPostById } from './postSelectors';
import { getUserById } from '../PostFeed/postFeedSelectors';


const mapStateToProps = (state, props) => {
  const post = getPostById(state, props.postId);
  return {
    currentUser: state.auth.currentUser,
    post: post,
    originalPoster: getUserById(state, post.user_id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upvotePost: (userId, postId) => dispatch(upvotePost(userId, postId)),
    downvotePost: (userId, postId) => dispatch(downvotePost(userId, postId)),
    removeVoteFromPost: (userId, postId) => dispatch(removeVoteFromPost(userId, postId))
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
      removeVoteFromPost,
      currentUser,
    } = this.props;

    const opName = originalPoster.first_name + ' ' + originalPoster.last_name;
    const numComments = post.num_comments;
    const userId = currentUser.user_id;

    return (
      <article className='post-malone'>
        <Vote
          post={post}
          onUpvote={() => upvotePost(userId, postId)}
          onDownvote={() => downvotePost(userId, postId)}
          onRemoveVote={() => removeVoteFromPost(userId, postId)}
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
