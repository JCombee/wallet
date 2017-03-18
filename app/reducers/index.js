import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import transactionsQueue from './transactionsQueue';

const rootReducer = combineReducers({
  counter,
  transactionsQueue,
  routing
});

export default rootReducer;
