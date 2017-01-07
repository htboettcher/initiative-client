import React from 'react';
import ReactDOM from 'react-dom';
import {PlayerStagingContainer} from './components/PlayerStaging';
import {PlayerViewContainer} from './components/PlayerView';
import {GMViewContainer} from './components/GMView';
import {PresentationViewContainer} from './components/Presentation';
import App from './components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './phb.css';
import './index.css';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import { Router, Route, hashHistory } from 'react-router'
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import createLogger from 'redux-logger';
import { Iterable } from 'immutable';

const logger = createLogger({
  stateTransformer: (state) => {
    let newState = {};

    for (var i of Object.keys(state)) {
      if (Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    };

    return newState;
  }
});


const socket = io(`localhost:8090`);

//const socket = io(`${location.protocol}//${location.hostname}`);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket),
  logger
)(createStore);
const store = createStoreWithMiddleware(reducer);

socket.on('state', state =>
  store.dispatch(setState(state))
);

const routes = <Route component={App}>
  <Route path="/" component={PlayerStagingContainer} />
  <Route path="/GM" component={GMViewContainer} />
  <Route path="/View" component={PresentationViewContainer} />
  <Route path="/player/:playername" component={PlayerViewContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);