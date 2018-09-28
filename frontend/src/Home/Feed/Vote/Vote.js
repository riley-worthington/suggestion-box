import React from 'react';
import './Vote.css';

const Vote = ({ post, onUpvote, onDownvote }) => {
  const currentUserVote = post.currentUserVote;
  return (
    <div className='vote-container'>
      <button
        className={'vote-button' + (currentUserVote === 1 ? ' voted' : '')}
        onClick={onUpvote}>&#9650;</button>
      <div className='vote-display'>
        {post.upvotes - post.downvotes}
      </div>
      <button
        className={'vote-button' + (currentUserVote === -1 ? ' voted' : '')}
        onClick={onDownvote}>&#9660;</button>
    </div>
  );
}

export default Vote;
