import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitPost } from '../PostFeed/postFeedActions';
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
    const { currentUser } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className='new-post-form'>
        <p className='prompt'>Add new post as
          <b>
            {` ${currentUser.firstName} ${currentUser.lastName}`}
          </b>
        </p>
        <input
          onChange={this.onPostTitleChange}
          type='text'
          placeholder='Title'
          value={this.state.postTitle}
          className='new-post-field'/>
        <textarea
          rows='4'
          cols='40'
          onChange={this.onPostBodyChange}
          placeholder='Add a post'
          value={this.state.postBody}
          className='new-post-field' />
        <button onClick={this.handleSubmit} className='new-post-button'>Post</button>
      </form>
    );
  }
}

export default connect(null, mapDispatchToProps)(AddPost);
