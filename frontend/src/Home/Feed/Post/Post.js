import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Vote from '../Vote/Vote';
import './Post.css';
import { upvotePost, downvotePost, removeVoteFromPost } from './postActions';
import { getPostById } from './postSelectors';
import { getUserById } from '../PostFeed/postFeedSelectors';


const mapStateToProps = (state, props) => {
  const { postObj } = props;
  return {
    currentUser: state.auth.currentUser,
    originalPoster: getUserById(state, postObj.user_id)
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
      postObj,
      originalPoster,
      upvotePost,
      downvotePost,
      removeVoteFromPost,
      currentUser,
    } = this.props;
    console.log('post:', postObj)

    const opName = originalPoster.first_name + ' ' + originalPoster.last_name;
    const numComments = postObj.num_comments;
    const userId = currentUser.user_id;
    const postId = postObj.post_id;
    const date = new Date(postObj.time_posted);

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
      <article className='post-malone'>
        <Vote
          post={postObj}
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
                {postObj.title}
              </Link>
            </h1>
            <h2 className='author'>
              {opName}
            </h2>
          </header>
          <p className='content'>
            {postObj.content}
          </p>
          <div className='comments-tag'>
            <Link
              to={`/posts/${postId}`}
              className='comments-tag' >
              {numComments + (numComments === 1 ? ' comment' : ' comments')}
            </Link>
            <p>{timeMessage}</p>
          </div>
        </div>
      </article>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
