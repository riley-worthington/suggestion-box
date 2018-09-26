import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

import { teams } from '../../fakeDatabase';

const SideBar = ({ teamIds }) => {
  const currTeams = teamIds.map(id => teams[id]);
  return (
    <div className='sidebar-container'>
      <div className='sidebar-title'>
        Your teams:
      </div>

      <ul className='group-list'>
        {currTeams.map((team, i) =>
          <NavLink
            to={`/teams/${team.teamid}`}
            key={team.teamid}
            activeStyle={{
              fontWeight: 'bold',
              color: 'red'
            }}>
            {team.name}
          </NavLink>
          )}
      </ul>
    </div>
  )
}

export default SideBar;
