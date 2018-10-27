import React, {Component} from 'react';
import { connect } from 'react-redux';

import TopNav from './TopNav/TopNav';
import SideBar from './SideBar/SideBar';
import PostFeed from './Feed/PostFeed/PostFeed';
import PostPage from './Feed/PostPage/PostPage';
import JoinPage from './JoinPage/JoinPage';
import './Home.css';

import { signOut } from '../Auth/authActions';
import { getUserTeams } from './homeActions';

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    selectedTeam: state.feed.selectedTeam,
    userTeams: state.home.userTeams,
    getUserTeamsPending: state.home.getUserTeamsPending,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(signOut()),
    getUserTeams: userId => dispatch(getUserTeams(userId)),
  }
}

class Home extends Component {
  componentDidMount() {
    const {
      currentUser,
      getUserTeams,
      userTeams,
    } = this.props;
    if (userTeams === null) {
      getUserTeams(currentUser.user_id);
    }
  }

  bodyLoader() {
    const { match, currentUser } = this.props;
    const url = match.url;
    const teamId = +match.params.teamId;
    const postId = +match.params.postId;
    if (!match.isExact) {
      return (
        <h1>Not Found</h1>
      );
    } else if (url === '/') {
      return (
        <div className='home-page'>
          <h1>{`Welcome, ${currentUser.first_name}.`}</h1>
          <p>
            Select a team from the sidebar to get started.
          </p>
        </div>
      );
    } else if (url.startsWith('/teams/')) {
      return (
        <PostFeed key={teamId} teamId={teamId} />
      );
    } else if (url.startsWith('/posts/')) {
      return (
        <PostPage postId={postId} />
      );
    } else if (url === '/join') {
      return (
        <JoinPage />
      );
    }
  }

  sidebarLoader() {
    const { userTeams, selectedTeam } = this.props;
    if (userTeams === null) {
      return (
        <h2>Loading...</h2>
      );
    } else {
      const userTeamsArray = Object.entries(userTeams).map(pair => pair[1]);
      return (
        <SideBar teams={userTeamsArray} selected={selectedTeam}/>
      );
    }
  }

  render() {
    const { currentUser, onSignOut } = this.props;

    return (
      <div className='home-container'>
        <header className='navigation'>
          <TopNav
            user={currentUser}
            onSignOut={onSignOut}
          />
        </header>
        <nav className='sidebar'>
          {this.sidebarLoader()}
        </nav>
        <main className='home-content'>
          {this.bodyLoader()}
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
