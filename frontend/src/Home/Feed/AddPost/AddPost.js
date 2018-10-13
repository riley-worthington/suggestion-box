import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitPost } from '../PostFeed/postFeedActions';
import './AddPost.css';

const mapStateToProps = (state, ownProps) => {
  const { currentTeam } = ownProps;
  console.log('current team:', currentTeam);
  console.log(state.home.userTeams)
  return {
    currentTeamName: state.home.userTeams[currentTeam].name,
  }
}

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
      postBody: '',
      alertBox: '',
      titleInvalid: false,
      bodyInvalid: false
    }
  }

  onPostTitleChange = (event) => {
    let invalid = true
    if (event.target.value.length > 0) {
      invalid = false
    }
    this.setState({
      postTitle: event.target.value,
      titleInvalid: invalid
    });
  }

  onPostBodyChange = (event) => {
    this.setState({postBody: event.target.value});
    if (event.target.value.length > 280) {
      this.setState({
        bodyInvalid: true,
        alertBox: 'Post cannot be longer than 280 characters'
      })
    } else {
      this.setState({
        bodyInvalid: false,
        alertBox: ''
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onSubmitPost, currentUser, currentTeam } = this.props;
    const { postTitle, postBody } = this.state;
    if (postBody.length > 280) {
      return;
    }
    if (postTitle === '') {
      this.setState({
        alertBox: 'Please enter a title',
        titleInvalid: true
      })
      return;
    }
    const newPost = {
      userId: currentUser.user_id,
      teamId: currentTeam,
      title: postTitle,
      content: postBody
    }
    onSubmitPost(newPost);
    this.setState({
      postTitle: '',
      postBody: '',
      alertBox: ''
    });
  }

  displayAlert() {
    return this.state.alertBox;
  }

  render() {
    const { currentUser, currentTeamName } = this.props;
    return (
      <form
        id='newPost'
        onSubmit={this.handleSubmit}
        className='new-post-form'>
        <p className='prompt'>Add new post in
          <b>
            {` ${currentTeamName} `}
          </b>
           as
          <b>
            {` ${currentUser.first_name} ${currentUser.last_name}`}
          </b>
        </p>
        <label htmlFor='title' className='visually-hidden'>Title</label>
        <input
          type='text'
          id='title'
          onChange={this.onPostTitleChange}
          placeholder='Title'
          value={this.state.postTitle}
          className={'new-post-field' + (this.state.titleInvalid ? ' invalid' : '')}
        />
        <label htmlFor='post' className='visually-hidden'>New Post</label>
        <textarea
          id='post'
          form='newPost'
          rows='4'
          cols='40'
          onChange={this.onPostBodyChange}
          placeholder='Add a post'
          value={this.state.postBody}
          className={'new-post-field' + (this.state.bodyInvalid ? ' invalid' : '')}
        />
        <button onClick={this.handleSubmit} className='new-post-button'>Post</button>
        <div className='alert-box'>
          {this.displayAlert()}
        </div>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
