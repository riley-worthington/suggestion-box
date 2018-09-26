import React, { Component } from 'react';
import Post from './Post';

import { teams, posts } from '../../fakeDatabase';

class PostFeed extends Component {
  componentDidMount() {
    // get posts
  }

  render() {
    const { teamId } = this.props
    const team = teams[teamId]
    const postIds = team.posts;
    const currPosts = postIds.map((id, i) => posts[id]);
    return (
      <div>
        {currPosts.map((post, i) => <Post key={post.postid} post={post}/> )}
      </div>
    );
  }
}

export default PostFeed;
