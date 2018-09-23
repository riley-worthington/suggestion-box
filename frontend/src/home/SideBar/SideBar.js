import React from 'react';
import Group from './Group';
import './SideBar.css';

const SideBar = ({ groups }) => {

  return (
    <div className='sidebar-container'>
      <div className='sidebar-title'>
        Your groups:
      </div>

      <ul className='group-list'>
        {groups.map((group, i) => <Group key={i} name={group}/>)}
      </ul>
    </div>
  )
}

export default SideBar;
