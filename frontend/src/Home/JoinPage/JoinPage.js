import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTeams } from './joinPageActions';

const mapDispatchToProps = dispatch => {
  return {
    getAllTeams: () => dispatch(getAllTeams()),
  }
}

const mapStateToProps = state => {
  return {
    teams: state.join.teams,
  }
}

class JoinPage extends Component {
  componentDidMount() {
    const { getAllTeams } = this.props;
    getAllTeams();
  }

  render() {
    const { teams } = this.props;
    console.log(teams);
    return (
      <div>
        <h1>Join a team</h1>
        {teams.map(team =>
          <div key={team.team_id}>{team.name}</div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinPage);
