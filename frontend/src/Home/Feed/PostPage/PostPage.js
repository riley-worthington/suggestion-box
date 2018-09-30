import React, { Fragment } from 'react';
import CommentFeed from '../CommentFeed/CommentFeed';
import './PostPage.css';

import Post from '../Post/Post';

const PostPage = ({ postId }) => {

  return (
    <div className='post-page'>
      <Post postId={postId} />
      <CommentFeed postId={postId} />
    </div>
  );
}

export default PostPage;
