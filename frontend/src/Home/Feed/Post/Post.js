import React from 'react';
import Vote from '../Vote/Vote';
import './Post.css';

import { users } from '../../../fakeDatabase';

const Post = ({ post }) => {
  const originalPoster = users[post.originalPoster];
  const opName = originalPoster.firstName + ' ' + originalPoster.lastName;
  return (
    <div className='post-malone'>
      <Vote post={post}/>
      <div className='post-body'>
        <div className='title'>
          {post.title}
        </div>
        <div className='author'>
          {opName}
        </div>
        <div className='content'>
          {post.content}
        </div>
      </div>
    </div>
  );
}

export default Post;
