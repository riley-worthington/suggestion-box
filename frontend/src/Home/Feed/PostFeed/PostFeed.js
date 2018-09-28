import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import AddPost from '../AddPost/AddPost';
import { loadPostListByTeam } from './postFeedActions';

const mapDispatchToProps = dispatch => {
  return {
    loadPostListByTeam: teamId => dispatch(loadPostListByTeam(teamId))
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    loadPostListPending: state.postList.loadPostListPending,
    postList: state.postList.postList
  }
}

class PostFeed extends Component {
  componentDidMount() {
    // get posts
    const { currentUser, loadPostListByTeam, teamId } = this.props;

    if (teamId !== undefined) {
      loadPostListByTeam(teamId);
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
      <div>
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
