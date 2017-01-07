import {fromJS, Map} from 'immutable';
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

function setState(state, newState) {
  return fromJS(newState);
}

function socketReducer(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  default:
    return state;
  }
}

const reducers = {
  socket: socketReducer,
  form: formReducer     // <---- Mounted at 'form'
}
export default combineReducers(reducers)