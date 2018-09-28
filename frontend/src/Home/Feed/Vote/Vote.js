import React from 'react';
import './Vote.css';

const Vote = ({ post, onUpvote, onDownvote }) => {

  return (
    <div className='vote-container'>
      <button className='vote-button' onClick={onUpvote}>&#9650;</button>
      <div className='vote-display'>
        {post.upvotes - post.downvotes}
      </div>
      <button className='vote-button' onClick={onDownvote}>&#9660;</button>
    </div>
  );
}

export default Vote;
