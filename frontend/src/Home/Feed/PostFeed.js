import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { loadPostListByTeam } from './actions';

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
    const { currentUser, loadPostListByTeam, teamId } = this.props;
    // Just pick the first team for now
    // const teamId = currentUser.teams[0];
    if (teamId !== undefined) {
      loadPostListByTeam(teamId);
    }
  }

  render() {
    const { loadPostListPending, postList } = this.props;
    const postListArray = Object.entries(postList).map(entry => entry[1]);

    return loadPostListPending ? (
      <div>
        Loading...
      </div>
    ) : (
      <div>
        {postListArray.map((post, i) => <Post key={post.postid} post={post}/> )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFeed);
