import React, {Component} from 'react';
import { connect } from 'react-redux';
import TopNav from './TopNav/TopNav';
import SideBar from './SideBar/SideBar';
import PostFeed from './Feed/PostFeed';
import AddPost from './AddPost/AddPost';
// import Post from './Feed/Post';
import './Home.css';

import { users } from '../fakeDatabase';
import { signout } from '../Auth/actions';

const mapStateToProps = state => {
  return {
    currentUser: state.loadUser.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(signout())
  }
}

class Home extends Component {

  render() {
    const currentUser = this.props.currentUser;
    const { isSignedIn, onSignOut } = this.props;

    return (
      <div className='home-container'>
        <TopNav user={currentUser} onSignOut={onSignOut}/>
        <main>
          <SideBar teamIds={currentUser.teams}/>
          <div>
            <AddPost />
            <PostFeed teamId={currentUser.teams[0]} />
          </div>
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
