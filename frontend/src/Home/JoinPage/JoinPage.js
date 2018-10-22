import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTeams, addTeamMember } from './joinPageActions';

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
  }
}

class JoinPage extends Component {
  componentDidMount() {
    const { getAllTeams } = this.props;
    getAllTeams();
  }

  render() {
    const { teams, addTeamMember, currentUser } = this.props;
    console.log(teams);
    return (
      <div>
        <h1>Join a team</h1>
        {teams.map(team =>
          <button key={team.team_id} onClick={() => addTeamMember(currentUser.user_id, team.team_id)}>{team.name}</button>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinPage);
