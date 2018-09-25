import React, {Component} from 'react';
import { connect } from 'react-redux';
import TopNav from './TopNav/TopNav';
import SideBar from './SideBar/SideBar';
import PostFeed from './Feed/PostFeed';
// import Post from './Feed/Post';
import './Home.css';

import { users } from '../fakeDatabase';

const mapStateToProps = state => {
  return {
    currentUser: state.loadUser.currentUser
  }
}

class Home extends Component {

  render() {
    const currentUser = this.props.currentUser;
    const { isSignedIn } = this.props;

    return (
      <div className='home-container'>
        <TopNav user={currentUser}/>
        <main>
          <SideBar teamIds={currentUser.teams}/>
          <PostFeed teamId={currentUser.teams[0]} />
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Home);
