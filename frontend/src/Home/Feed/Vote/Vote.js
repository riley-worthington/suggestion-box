import React from 'react';
import './Vote.css';

const Vote = ({ post, onUpvote, onDownvote }) => {

  return (
    <div className='vote-container'>
      <button onClick={onUpvote}>Up</button>
      {post.upvotes - post.downvotes}
      <button onClick={onDownvote}>Down</button>
    </div>
  );
}

export default Vote;
