import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const SideBar = ({ teams, selected }) => {
  console.log('selected', selected)
  return (
    <Fragment>
      <h1 className='sidebar-title'>
        Your teams:
      </h1>

      <ul className='group-list'>
        {teams.map((team, i) =>
          <li key={team.team_id}>
            <NavLink
              className={'sidebar-team' + (team.team_id === selected ? ' selected' : '')}
              to={`/teams/${team.team_id}`}
            >
              {team.name}
            </NavLink>
          </li>
        )}
      </ul>

      <button className='join-team-button'>+ Join team</button>
    </Fragment>
  )
}

export default SideBar;
