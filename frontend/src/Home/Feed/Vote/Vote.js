import React from 'react';
import './Vote.css';

const UPVOTE = 1;
const DOWNVOTE = -1;

const Vote = ({ post, onUpvote, onDownvote, onRemoveVote }) => {
  const currentUserVote = post.currentUserVote;

  function handleUpClick() {
    if (currentUserVote === UPVOTE) {
      onRemoveVote()
    } else if (currentUserVote === DOWNVOTE) {
      onRemoveVote()
      onUpvote()
    } else {
      onUpvote()
    }
  }

  function handleDownClick() {
    if (currentUserVote === DOWNVOTE) {
      onRemoveVote()
    } else if (currentUserVote === UPVOTE) {
      onRemoveVote()
      onDownvote()
    } else {
      onDownvote()
    }
  }

  function getClass() {
    if (currentUserVote === UPVOTE) {
      return ' voted-up'
    } else if (currentUserVote === DOWNVOTE) {
      return ' voted-down'
    } else {
      return ''
    }
  }

  return (
    <div className='vote-container'>
      <button
        className={'vote-button' + (currentUserVote === UPVOTE ? ' voted-up' : '')}
        onClick={handleUpClick}>&#9650;</button>
      <div className={'vote-display' + getClass()}>
        {post.upvotes - post.downvotes}
      </div>
      <button
        className={'vote-button' + (currentUserVote === DOWNVOTE ? ' voted-down' : '')}
        onClick={handleDownClick}>&#9660;</button>
    </div>
  );
}

export default Vote;
