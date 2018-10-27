import React from 'react';
import './Vote.css';

const UPVOTE = true;
const DOWNVOTE = false;

const Vote = ({ post, onUpvote, onDownvote, onRemoveVote, userVote }) => {
  function handleUpClick() {
    if (userVote === UPVOTE) {
      onRemoveVote()
    } else if (userVote === DOWNVOTE) {
      // onRemoveVote()
      onUpvote()
    } else {
      onUpvote()
    }
  }

  function handleDownClick() {
    if (userVote === DOWNVOTE) {
      onRemoveVote()
    } else if (userVote === UPVOTE) {
      // onRemoveVote()
      onDownvote()
    } else {
      onDownvote()
    }
  }

  function getClass() {
    if (userVote === UPVOTE) {
      return ' voted-up'
    } else if (userVote === DOWNVOTE) {
      return ' voted-down'
    } else {
      return ''
    }
  }

  return (
    <div className='vote-container'>
      <button
        className={'vote-button' + (userVote === UPVOTE ? ' voted-up' : '')}
        onClick={handleUpClick}>&#9650;</button>
      <div className={'vote-display' + getClass()}>
        {post.upvotes - post.downvotes}
      </div>
      <button
        className={'vote-button' + (userVote === DOWNVOTE ? ' voted-down' : '')}
        onClick={handleDownClick}>&#9660;</button>
    </div>
  );
}

export default Vote;
