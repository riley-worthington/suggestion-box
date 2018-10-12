import React, {Component} from 'react';
import { connect } from 'react-redux';

import TopNav from './TopNav/TopNav';
import SideBar from './SideBar/SideBar';
import PostFeed from './Feed/PostFeed/PostFeed';
import PostPage from './Feed/PostPage/PostPage';
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
    const { currentUser, getUserTeams } = this.props;
    getUserTeams(currentUser.user_id);
  }

  bodyLoader() {
    const { match } = this.props;
    const url = match.url;
    const teamId = +match.params.teamId;
    console.log('here', teamId)
    const postId = +match.params.postId;
    if (!match.isExact) {
      return (
        <h1>Not Found</h1>
      );
    } else if (url === '/') {
      return (
        <h1>Home Page</h1>
      );
    } else if (url.startsWith('/teams/')) {
      return (
        <PostFeed teamId={teamId} />
      );
    } else if (url.startsWith('/posts/')) {
      return (
        <PostPage postId={postId} />
      );
    }
  }

  sidebarLoader() {
    const { getUserTeamsPending, userTeams, selectedTeam } = this.props;
    if (getUserTeamsPending || Object.keys(userTeams).length === 0) {
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
    const { currentUser, userTeams, selectedTeam, onSignOut } = this.props;
    // const teamId = +match.params.teamId;
    // const postId = +match.params.postId;


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
