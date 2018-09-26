import React from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';

const TopNav = ({ user, onSignOut }) => {
  return (
    <header className='nav-header'>
      <div className='site-title'>
        SuggestionBox
      </div>
      <nav className='top-nav'>
        <div className='dropdown'>
          {user.firstname}
        </div>
        <button onClick={onSignOut}>Sign Out</button>
      </nav>
    </header>
  )
}

export default TopNav;
