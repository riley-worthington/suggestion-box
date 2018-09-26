import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import TopNav from './TopNav/TopNav';
import SideBar from './SideBar/SideBar';
import PostFeed from './Feed/PostFeed';
import AddPost from './AddPost/AddPost';
import './Home.css';

import { signOut } from '../Auth/authActions';

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(signOut())
  }
}

class Home extends Component {

  render() {
    const currentUser = this.props.currentUser;
    const { onSignOut, match } = this.props;
    console.log(match)
    console.log('path', match.path);
    console.log('url', match.url);
    const teamId = +match.params.teamId;

    return (
      <div className='home-container'>
        <TopNav user={currentUser} onSignOut={onSignOut}/>
        <main>
          <SideBar teamIds={currentUser.teams}/>
          <div>
            <AddPost />
            <PostFeed teamId={teamId} />
          </div>
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
