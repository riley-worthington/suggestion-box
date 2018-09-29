import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

import { teams } from '../../fakeDatabase';

const SideBar = ({ teamIds }) => {
  const currTeams = teamIds.map(id => teams[id]);
  return (
    <Fragment>
      <h1 className='sidebar-title'>
        Your teams:
      </h1>

      <ul className='group-list'>
        {currTeams.map((team, i) =>
          <li>
            <NavLink
              className='sidebar-team'
              to={`/teams/${team.teamId}`}
              key={team.teamId}
              activeStyle={{
                fontWeight: 'bold',
                color: '#a383c6'
              }}>
              {team.name}
            </NavLink>
          </li>
        )}
      </ul>
    </Fragment>
  )
}

export default SideBar;
