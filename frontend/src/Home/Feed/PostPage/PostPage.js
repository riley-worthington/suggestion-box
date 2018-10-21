import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentFeed from '../CommentFeed/CommentFeed';
import './PostPage.css';
import Post from '../Post/Post';
import { loadPostById } from '../Post/postActions';
import { loadTeamMembers, loadUserVotes } from '../PostFeed/postFeedActions';

const mapStateToProps = (state, ownProps) => {
  const currentPostId = state.posts.currentPost;
  return {
    currentUser: state.auth.currentUser,
    currentPost: state.posts.postsById[currentPostId],
    loadPostPending: state.posts.loadPostPending,
    teamMembersById: state.feed.teamMembersById,
    userVotes: state.feed.userVotes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPostById: postId => dispatch(loadPostById(postId)),
    loadTeamMembers: teamId => dispatch(loadTeamMembers(teamId)),
    loadUserVotes: userId => dispatch(loadUserVotes(userId)),
  }
}

class PostPage extends Component {
  componentDidMount() {
    const {
      postId,
      currentPost,
      loadPostById,
      loadUserVotes,
      currentUser,
    } = this.props;
    if (!currentPost) {
      loadPostById(postId);
    } else if (currentPost.post_id !== postId) {
      loadPostById(postId);
    }
    loadUserVotes(currentUser.user_id);
  }

  render() {
    const {
      currentPost,
      postId,
      teamMembersById,
      loadTeamMembers,
      userVotes,
    } = this.props;
    if (currentPost && Object.keys(teamMembersById).length < 1) {
      loadTeamMembers(currentPost.team_id);
    }
    return (currentPost && currentPost.post_id === postId && (Object.keys(teamMembersById).length > 0) && userVotes !== null) ? (
      <div className='post-page'>
        <Post
          postObj={currentPost}
        />
        <CommentFeed key={postId} postId={postId} />
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
