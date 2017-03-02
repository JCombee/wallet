import { remote } from 'electron';
import { ACTIONS } from './../../constants/db';

export function init() {
  return dispatch => {
    dispatch(startInitialization());
    dispatch(finishedInitialization());
  };
}

function startInitialization() {
  return {
    type: ACTIONS.START_INITIALIZATION
  };
}

function finishedInitialization() {
  return {
    type: ACTIONS.FINISHED_INITIALIZATION
  };
}
