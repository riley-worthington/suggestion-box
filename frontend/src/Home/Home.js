import React, {Component} from 'react';
import TopNav from './TopNav/TopNav';
import SideBar from './SideBar/SideBar';
import PostFeed from './Feed/PostFeed';
// import Post from './Feed/Post';
import './Home.css';

import { users } from '../fakeDatabase';

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
    const { isSignedIn } = this.props;
    const user = users[1];
    console.log(this.state.user, isSignedIn);

    return (
      <div className='home-container'>
        <TopNav user={user}/>
        <main>
          <SideBar teamIds={user.teams}/>
          <PostFeed teamId={user.teams[0]} />
        </main>
      </div>
    );
  }
}

export default Home;
