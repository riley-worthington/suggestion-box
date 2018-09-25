import React from 'react';
import { NavLink } from 'react-router-dom';
import './Group.css';

const Group = ({ name }) => {
  return (
    <li className='Group'>
      <NavLink
        to={`/${name}`}
        activeStyle={{
          fontWeight: 'bold',
          color: 'red'
        }}>
        {name}
      </NavLink>
    </li>
  )
}

export default Group;
