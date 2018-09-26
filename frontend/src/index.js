import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { loadUser } from './Auth/reducers';
import { loadPostList } from './Home/Feed/reducers';

const logger = createLogger();
const rootReducer = combineReducers({ loadUser, loadPostList })

// apply logger middleware
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
