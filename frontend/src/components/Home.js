import React from 'react';

const Home = ({ onRouteChange, isSignedIn }) => {
  return (
    <div>
      <nav>
        <button onClick={() => onRouteChange('signout')}>Sign Out</button>
      </nav>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
