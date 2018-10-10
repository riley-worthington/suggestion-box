import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import AddPost from '../AddPost/AddPost';
import { loadPostListByTeam, loadTeamMembers } from './postFeedActions';
import './PostFeed.css'

const mapDispatchToProps = dispatch => {
  return {
    loadPostListByTeam: teamId => dispatch(loadPostListByTeam(teamId)),
    loadTeamMembers: teamId => dispatch(loadTeamMembers(teamId))
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    loadPostListPending: state.feed.loadPostListPending,
    postList: state.feed.postList
  }
}

class PostFeed extends Component {
  componentDidMount() {
    // get posts
    const {
      currentUser,
      loadPostListByTeam,
      teamId,
      loadTeamMembers
    } = this.props;

    if (teamId !== undefined) {
      loadPostListByTeam(teamId);
      loadTeamMembers(teamId);
    }
  }

  render() {
    const {
      currentUser,
      loadPostListPending,
      postList,
      loadPostListByTeam,
      teamId
    } = this.props;

    return loadPostListPending ? (
      <div>
        Loading...
      </div>
    ) : (
      <div className='post-feed'>
        <AddPost currentUser={currentUser}/>
        { postList.map((postId, i) =>
          <Post
            key={postId}
            postId={postId}
          /> ) }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFeed);
