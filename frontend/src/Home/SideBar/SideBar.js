import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const SideBar = ({ teams, selected }) => {
  return (
    <Fragment>
      <h1 className='sidebar-title'>
        Your teams:
      </h1>

      <ul className='group-list'>
        {teams.map((team, i) =>
          <li className={'team-container' + (team.team_id === selected ? ' selected' : '')}
            key={team.team_id}>
            <NavLink
              className={'sidebar-team' + (team.team_id === selected ? ' selected' : '')}
              to={`/teams/${team.team_id}`}
            >
              {team.name}
            </NavLink>
          </li>
        )}
      </ul>
      <NavLink
        className='join-team-button'
        to={'/join'}>+ Join team</NavLink>
    </Fragment>
  )
}

export default SideBar;
