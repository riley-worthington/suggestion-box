import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitPost } from '../PostFeed/actions';
import './AddPost.css';

const mapDispatchToProps = dispatch => {
  return {
    onSubmitPost: post => dispatch(submitPost(post))
  }
}

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: '',
      postBody: ''
    }
  }

  onPostTitleChange = (event) => {
    this.setState({postTitle: event.target.value});
  }

  onPostBodyChange = (event) => {
    this.setState({postBody: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onSubmitPost, currentUser } = this.props;
    const { postTitle, postBody } = this.state;
    const newPost = {
      originalPoster: currentUser.userId,
      upvotes: 0,
      downvotes: 0,
      comments: [0],
      postId: 3,
      title: postTitle,
      content: postBody
    }
    onSubmitPost(newPost);
    this.setState({
      postTitle: '',
      postBody: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='new-post-form'>
        <input onChange={this.onPostTitleChange} type='text' placeholder='Title' />
        <textarea onChange={this.onPostBodyChange} placeholder='Add a post' className='new-post-field'></textarea>
        <button onClick={this.handleSubmit} className='new-post-button'>Post</button>
      </form>
    );
  }
}

export default connect(null, mapDispatchToProps)(AddPost);
