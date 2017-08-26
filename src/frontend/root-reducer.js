/**
 * Dependencies
 */
import { combineReducers } from 'redux';

/**
 * Import routing state reducer
 */
import { routerReducer as routing } from 'react-router-redux';

/**
 * Import global / shared reducers
 */
import collections from './ducks';
/**
 * Create combined reducer
 */
export default combineReducers({
  collections,
  routing,
});
