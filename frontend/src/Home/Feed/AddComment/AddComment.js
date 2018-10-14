import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitComment } from '../CommentFeed/commentFeedActions';
import './AddComment.css';

const mapDispatchToProps = dispatch => {
  return {
    onSubmitComment: comment => dispatch(submitComment(comment))
  }
}

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBody: ''
    }
  }

  onCommentBodyChange = event => {
    this.setState({
      commentBody: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmitComment, currentUser, postId } = this.props;
    const { commentBody } = this.state;

    const newComment = {
      userId: currentUser.user_id,
      postId: postId,
      content: commentBody
    }

    onSubmitComment(newComment);
    this.setState({
      commentBody: ''
    });
  }

  render() {
    const { currentUser } = this.props;
    return (
      <form
        id='newComment'
        onSubmit={this.handleSubmit}
        className='new-comment-form'>
        <label htmlFor='comment' className='visually-hidden'>New Comment</label>
        <textarea
          id='comment'
          form='newComment'
          rows='4'
          cols='40'
          onChange={this.onCommentBodyChange}
          placeholder={`Add a comment as ${currentUser.first_name} ${currentUser.last_name}`}
          value={this.state.commentBody}
          className={'new-comment-field'}
        />
        <button onClick={this.handleSubmit} className='new-comment-button'>Comment</button>
      </form>
    );
  }
}

export default connect(null, mapDispatchToProps)(AddComment);
