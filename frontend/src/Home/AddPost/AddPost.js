import React, { Component } from 'react';
import './AddPost.css';

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: ''
    }
  }

  onTextAreaChange = (event) => {
    this.setState({textInput: event.target.value});
  }

  render() {
    return (
      <div>
        <textarea onChange={this.onTextAreaChange} placeholder={'Add a post'} className='add-post-field'></textarea>
        <button className='add-post-button'>Post</button>
      </div>
    );
  }
}

export default AddPost;
