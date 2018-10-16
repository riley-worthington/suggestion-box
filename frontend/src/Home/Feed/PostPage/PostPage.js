import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentFeed from '../CommentFeed/CommentFeed';
import './PostPage.css';
import Post from '../Post/Post';
import { getPostById } from '../Post/postSelectors';
import { loadPostById } from '../Post/postActions';
import { loadTeamMembers } from '../PostFeed/postFeedActions'

const mapStateToProps = (state, ownProps) => {
  return {
    currentPost: state.posts.currentPost,
    loadPostPending: state.posts.loadPostPending,
    teamMembersById: state.feed.teamMembersById,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPostById: postId => dispatch(loadPostById(postId)),
    loadTeamMembers: teamId => dispatch(loadTeamMembers(teamId)),
  }
}

class PostPage extends Component {
  componentDidMount() {
    const { postId, currentPost, loadPostById, loadTeamMembers } = this.props;
    console.log(postId, currentPost)
    if (!currentPost) {
      loadPostById(postId);
    } else if (currentPost.post_id !== postId) {
      loadPostById(postId);
    }

  }

  render() {
    const { currentPost, postId, teamMembersById, loadTeamMembers } = this.props;
    console.log('POST ID:', postId)
    if (currentPost && Object.keys(teamMembersById).length < 1) {
      loadTeamMembers(currentPost.team_id);
    }
    return (currentPost && currentPost.post_id === postId && (Object.keys(teamMembersById).length > 0)) ? (
      <div className='post-page'>
        <Post postObj={currentPost} />
        <CommentFeed key={postId} postId={postId} />
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
