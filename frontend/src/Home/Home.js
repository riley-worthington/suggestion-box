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
    currentUser: state.auth.currentUser
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
      <PostFeed teamId={teamId} />
  }

  render() {
    const currentUser = this.props.currentUser;
    const { onSignOut, match } = this.props;
    const teamId = +match.params.teamId;

    return (
      <div className='home-container'>
        <header className='navigation'>
          <TopNav
            user={currentUser}
            onSignOut={onSignOut}
          />
        </header>
        <nav className='sidebar' role='navigation'>
          <SideBar teamIds={currentUser.teams} />
        </nav>
        <main className='home-content'>
          {this.bodyLoader()}
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
