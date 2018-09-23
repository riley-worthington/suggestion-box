import React from 'react';
import Post from '../Post/Post';

const PostFeed = ({ team }) => {
  const posts = team.posts;
  return (
    <div>
      {posts.map((post, i) => <Post key={post.postid} post={post}/> )}
    </div>
  );
}

export default PostFeed;
