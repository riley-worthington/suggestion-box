import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import TopNav from './TopNav/TopNav';
import SideBar from './SideBar/SideBar';
import PostFeed from './Feed/PostFeed/PostFeed';
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
  bodyLoader() {
    const { match } = this.props;
    const url = match.url;
    const teamId = +match.params.teamId;
    return (url === '/') ?
      <h1>Home Page</h1>
      :
      <div>
        <PostFeed teamId={teamId} />
      </div>
  }

  render() {
    const currentUser = this.props.currentUser;
    const { onSignOut, match } = this.props;
    const teamId = +match.params.teamId;

    return (
      <div className='home-container'>
        <TopNav user={currentUser} onSignOut={onSignOut}/>
        <main>
          <SideBar teamIds={currentUser.teams}/>
          {this.bodyLoader()}
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
