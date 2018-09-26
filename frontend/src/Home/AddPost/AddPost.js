import React, { Component } from 'react';

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
        <textarea onChange={this.onTextAreaChange}></textarea>
        <button>Post</button>
      </div>
    );
  }
}

export default AddPost;
