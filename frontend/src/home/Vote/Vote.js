import React from 'react';
import './Vote.css';

const Vote = ({ post }) => {
  const upvote = () => {
    post.upvotes += 1;
  }

  return (
    <div className='vote-container'>
      <button onClick={upvote}>Up</button>
      {post.upvotes - post.downvotes}
      <button>Down</button>
    </div>
  );
}

export default Vote;
