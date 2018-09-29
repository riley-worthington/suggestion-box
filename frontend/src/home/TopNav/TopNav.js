import React, { Fragment } from 'react';
import './TopNav.css';

const TopNav = ({ user, onSignOut }) => {
  return (
    <Fragment>
      <h1 className='site-title'>
        Disco
      </h1>
      <nav className='top-nav'>
        <div className='dropdown'>
          {user.firstName}
        </div>
        <button onClick={onSignOut} className='signout-button'>Sign Out</button>
      </nav>
    </Fragment>
  )
}

export default TopNav;
