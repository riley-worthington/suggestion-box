import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import AddPost from '../AddPost/AddPost';
import { loadPostListByTeam, upvotePost, downvotePost } from './postActions';

const mapDispatchToProps = dispatch => {
  return {
    loadPostListByTeam: teamId => dispatch(loadPostListByTeam(teamId)),
    upvotePost: postId => dispatch(upvotePost(postId)),
    downvotePost: postId => dispatch(downvotePost(postId))
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
    const {
      currentUser,
      loadPostListPending,
      postList,
      upvotePost,
      downvotePost
    } = this.props;
    const postListArray = Object.entries(postList).map(entry => entry[1]);

    return loadPostListPending ? (
      <div>
        Loading...
      </div>
    ) : (
      <div>
        <AddPost currentUser={currentUser}/>
        {postListArray.map((post, i) =>
          <Post
            key={post.postId}
            post={post}
            onUpvote={() => upvotePost(post.postId)}
            onDownvote={() => downvotePost(post.postId)}
          /> )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFeed);
