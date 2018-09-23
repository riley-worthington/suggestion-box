import React, {Component} from 'react';
import TopNav from '../TopNav/TopNav';
import SideBar from '../SideBar/SideBar';
import PostFeed from './PostFeed';
import Post from '../Post/Post';
import './Home.css';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    }
  }

  handleAddGroup() {
    console.log('Adding group')
  }

  render() {
    const { user, onRouteChange, isSignedIn } = this.props
    console.log(this.state.user);

    const sample_team = {
      name: 'SuggestionBox',
      groupid: 33,
      members: [123],
      posts: [{
        originalPoster: 123,
        upvotes: 10,
        downvotes: 1,
        comments: [2],
        postid: 1,
        title: 'First ever post',
        content: "This app is so cool!"
      },
      {
        originalPoster: 122,
        upvotes: 5,
        downvotes: 2,
        comments: [],
        postid: 2,
        title: 'Sup',
        content: 'Test'
      }]
    }

    return (
      <div className='home-container'>
        <TopNav onRouteChange={onRouteChange} user={user}/>
        <main>
          <SideBar groups={this.state.user.groups}/>
          <PostFeed team={sample_team} />
        </main>
      </div>
    );
  }
}

export default Home;
