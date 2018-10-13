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
    loadTeamMembersPending: state.feed.loadTeamMembersPending,
    postList: state.feed.postList,
    getUserTeamsPending: state.home.getUserTeamsPending,
    userTeams: state.home.userTeams,
  }
}

class PostFeed extends Component {
  componentDidMount() {
    // get posts
    const {
      loadPostListByTeam,
      teamId,
      loadTeamMembers
    } = this.props;

    if (teamId !== undefined) {
      console.log('postFeed loading:', teamId)
      loadPostListByTeam(teamId);
      loadTeamMembers(teamId);
    }
  }

  render() {
    const {
      currentUser,
      loadPostListPending,
      loadTeamMembersPending,
      postList,
      loadPostListByTeam,
      teamId,
      getUserTeamsPending,
      userTeams,
    } = this.props;

    return (loadPostListPending || loadTeamMembersPending || getUserTeamsPending || Object.keys(userTeams).length === 0) ? (
      <div>
        Loading...
      </div>
    ) : (
      <div className='post-feed'>
        <AddPost currentUser={currentUser} currentTeam={teamId} />
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
