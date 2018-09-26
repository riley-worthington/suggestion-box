import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { loadPostListByTeam } from './actions';

import { teams, posts } from '../../fakeDatabase';

const mapDispatchToProps = dispatch => {
  return {
    loadPostListByTeam: teamId => dispatch(loadPostListByTeam(teamId))
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    loadPostListPending: state.posts.loadPostListPending,
    postList: state.posts.postList
  }
}

class PostFeed extends Component {
  componentDidMount() {
    // get posts
    const { currentUser, loadPostListByTeam } = this.props;
    // Just pick the first team for now
    const teamId = currentUser.teams[0];
    if (teamId != undefined) {
      loadPostListByTeam(teamId);
    }
  }

  render() {
    const { currentUser, loadPostListPending, postList } = this.props;
    // const team = teams[teamId];
    // const postIds = team.posts;
    // const currPosts = postIds.map((id, i) => posts[id]);
    return (
      <div>
        {postList.map((post, i) => <Post key={post.postid} post={post}/> )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFeed);
