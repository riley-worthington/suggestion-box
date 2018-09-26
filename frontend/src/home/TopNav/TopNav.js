import React from 'react';
import './TopNav.css';

const TopNav = ({ user, onSignOut }) => {
  return (
    <header className='nav-header'>
      <div className='site-title'>
        SuggestionBox
      </div>
      <nav className='top-nav'>
        <div className='dropdown'>
          {user.firstName}
        </div>
        <button onClick={onSignOut} className='signout-button'>Sign Out</button>
      </nav>
    </header>
  )
}

export default TopNav;
