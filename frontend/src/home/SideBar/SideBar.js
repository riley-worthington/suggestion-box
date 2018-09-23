import React from 'react';
import Group from './Group';
import './SideBar.css';

import { teams } from '../../fakeDatabase';

const SideBar = ({ teamIds }) => {
  const currTeams = teamIds.map(id => teams[id]);
  console.log('teams', currTeams);
  return (
    <div className='sidebar-container'>
      <div className='sidebar-title'>
        Your teams:
      </div>

      <ul className='group-list'>
        {currTeams.map((team, i) => <Group key={team.teamid} name={team.name}/> )}
      </ul>
    </div>
  )
}

export default SideBar;
