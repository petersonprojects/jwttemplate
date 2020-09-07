import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import {
  Provider
} from 'react-redux'
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import reduxThunk from 'redux-thunk'

import Welcome from './components/Welcome';
import Feature from './components/Feature';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';

import reducers from './reducers';

import App from './App';

let store = createStore(reducers, {
    auth: {
      authenticated: localStorage.getItem('token')
    }
  },
  compose(applyMiddleware(reduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

ReactDOM.render( <
  Provider store = {
    store
  } >
  <
  BrowserRouter >


  <
  Route exact path = '/'
  component = {
    Welcome
  }
  /> <
  Route path = '/signup'
  component = {
    Signup
  }
  /> <
  Route path = '/feature'
  component = {
    Feature
  }
  /> <
  Route path = '/signout'
  component = {
    Signout
  }
  /> <
  Route path = '/signin'
  component = {
    Signin
  }
  />


  <
  /BrowserRouter> <
  /Provider>,
  document.getElementById('root')
);