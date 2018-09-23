import React from 'react';
import Vote from '../Vote/Vote';
import './Post.css';

const sample_post = {
  originalPoster: 123,
  upvotes: 10,
  downvotes: 1,
  comments: [2],
  postid: 1,
  title: "First ever post",
  content: "This app is so cool!"
}

const Post = () => {
  return (
    <div className='post-malone'>
      <Vote post={sample_post}/>
      <div className='post-body'>
        <div className='author'>
          Riley Worthington
        </div>
        <div className='title'>
          {sample_post.title}
        </div>
        <div className='content'>
          {sample_post.content}
        </div>
      </div>
    </div>
  );
}

export default Post;
