import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

import { teams } from '../../fakeDatabase';


const SideBar = ({ teamIds, selected }) => {
  console.log('selected', selected)
  const currTeams = teamIds.map(id => teams[id]);
  return (
    <Fragment>
      <h1 className='sidebar-title'>
        Your teams:
      </h1>

      <ul className='group-list'>
        {currTeams.map((team, i) =>
          <li key={team.teamId}>
            <NavLink
              className={'sidebar-team' + (team.teamId === selected ? ' selected' : '')}
              to={`/teams/${team.teamId}`}
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
