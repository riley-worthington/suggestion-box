import React from 'react';
import './TopNav.css';

const TopNav = ({ onRouteChange, user }) => {
  return (
    <header className='nav-header'>
      <div className='site-title'>
        SuggestionBox
      </div>
      <nav className='top-nav'>
        <div className='dropdown'>
          {user.firstname}
        </div>
        <button className='logout-button' onClick={() => onRouteChange('signin')}>Log Out</button>
      </nav>
    </header>
  )
}

export default TopNav;
