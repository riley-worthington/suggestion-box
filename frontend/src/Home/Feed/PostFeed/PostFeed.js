import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import AddPost from '../AddPost/AddPost';
import Filter from '../Filter/Filter';
import Loader from '../../Loader/Loader';
import { loadPostListByTeam, loadTeamMembers, loadUserPostVotes } from './postFeedActions';
import { selectSortedPosts } from './postFeedSelectors';
import './PostFeed.css';


const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    loadPostListPending: state.feed.loadPostListPending,
    loadTeamMembersPending: state.feed.loadTeamMembersPending,
    postList: selectSortedPosts(state),
    getUserTeamsPending: state.home.getUserTeamsPending,
    userTeams: state.home.userTeams,
    loadUserVotesPending: state.feed.loadUserVotesPending,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPostListByTeam: teamId => dispatch(loadPostListByTeam(teamId)),
    loadTeamMembers: teamId => dispatch(loadTeamMembers(teamId)),
    loadUserPostVotes: userId => dispatch(loadUserPostVotes(userId)),
  }
}

class PostFeed extends Component {
  componentDidMount() {
    // get posts
    const {
      teamId,
      loadPostListByTeam,
      loadTeamMembers,
      loadUserPostVotes,
      currentUser,
    } = this.props;

    if (teamId !== undefined) {
      loadPostListByTeam(teamId);
      loadTeamMembers(teamId);
    }
    loadUserPostVotes(currentUser.user_id);
  }

  render() {
    const {
      currentUser,
      loadPostListPending,
      loadTeamMembersPending,
      postList,
      teamId,
      getUserTeamsPending,
      userTeams,
      loadUserVotesPending,
    } = this.props;

    return (loadPostListPending || loadTeamMembersPending || getUserTeamsPending || loadUserVotesPending || userTeams === null) ? (
      <Loader />
    ) : (
      <div className='post-feed'>
        <AddPost currentUser={currentUser} currentTeam={teamId} />
        <Filter />
        { postList.map((post, i) =>
          <Post
            key={post.post_id}
            postObj={post}
          /> ) }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFeed);
