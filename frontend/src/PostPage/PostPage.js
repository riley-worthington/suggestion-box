import React from 'react';

import Post from '../Home/Feed/Post/Post';

const PostPage = ({ match }) => {
  const url = match.url;
  const postId = +match.params.postId;

  return (
    <Post postId={postId} />
  );
}

export default PostPage;
