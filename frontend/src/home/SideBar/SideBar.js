import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './SideBar.css';

const SideBar = ({ teams, selected }) => {
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
      <Link
        className='join-team-button'
        to={'/join'}>+ Join team</Link>
      {/* <button className='join-team-button'>+ Join team</button> */}
    </Fragment>
  )
}

export default SideBar;
