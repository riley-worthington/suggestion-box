import React, { Component } from 'react';
import Login from './Login'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SuggestionBox</h1>
          <Login />
        </header>
        <p className="App-intro">
          A place for creative collaboration.
        </p>
      </div>
    );
  }
}

export default App;
