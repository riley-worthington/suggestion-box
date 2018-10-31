import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTeams, addTeamMember } from './joinPageActions';
import Loader from '../Loader/Loader';
import './JoinPage.css';

const mapDispatchToProps = dispatch => {
  return {
    getAllTeams: () => dispatch(getAllTeams()),
    addTeamMember: (userId, teamId) => dispatch(addTeamMember(userId, teamId)),
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    teams: state.join.teams,
    userTeams: state.home.userTeams,
  }
}

class JoinPage extends Component {
  componentDidMount() {
    const { getAllTeams } = this.props;
    getAllTeams();
  }

  // returns teams in otherTeams that are not in userTeams
  getTeamsNotIn(userTeams, otherTeams) {
    if (userTeams && otherTeams) {
      return otherTeams.filter(team => !(team.team_id in userTeams));
    }
    return undefined;
  }

  render() {
    const { teams, addTeamMember, currentUser, userTeams } = this.props;
    console.log(teams);
    const teamsNotIn = this.getTeamsNotIn(userTeams, teams);

    return (
      <div className='join-page'>
        {(teams && userTeams) ?
          <div>
            <h1>Join a team</h1>
            {teamsNotIn.length > 0 ?
              teamsNotIn.map(team =>
                <div>
                  <input type="checkbox"
                         id={team.team_id}
                         key={team.team_id}
                         name={team.name}
                         value={team.name} />
                  <label htmlFor={team.name}>{team.name}</label>
                </div>
                // <button
                //   className='join-button'
                //   key={team.team_id}
                //   onClick={() => addTeamMember(currentUser.user_id, team.team_id)}>
                //   {team.name}
                // </button>)
              )
              :
              <div>
                <p>
                  No teams to join
                </p>
                <button className='create-team-button'>
                  Create a team
                </button>
              </div>
            }
          </div>
          :
          <Loader />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinPage);
