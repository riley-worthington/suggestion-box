import React, { Fragment } from 'react';
import './TopNav.css';

const TopNav = ({ user, onSignOut }) => {
  return (
    <Fragment>
      <h1 className='site-title'>
        PostUp
      </h1>
      <nav className='top-nav'>
        <div className='dropdown'>
          {user.first_name}
        </div>
        <button onClick={onSignOut} className='signout-button '>Sign Out</button>
      </nav>
    </Fragment>
  )
}

export default TopNav;
