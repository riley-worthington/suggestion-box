import React, { Component } from 'react';
import Vote from '../Vote/Vote';
import './Comment.css';

import { users } from '../../../fakeDatabase';

const Comment = ({ commentObj }) => {
  const commenter = users[commentObj.commenter];
  return (
    <article className='comment-container'>
      <h2 className='commenter-name'>{`${commenter.firstName} ${commenter.lastName}`}</h2>
      <p className='comment-body'>{commentObj.content}</p>
    </article>
  );
}

export default Comment;
