import React from 'react';
import Post from './Post';

import { teams, posts } from '../../fakeDatabase';

const PostFeed = ({ teamId }) => {
  const team = teams[teamId]
  const postIds = team.posts;
  const currPosts = postIds.map((id, i) => posts[id]);
  return (
    <div>
      {currPosts.map((post, i) => <Post key={post.postid} post={post}/> )}
    </div>
  );
}

export default PostFeed;
