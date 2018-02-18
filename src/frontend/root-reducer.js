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
import firebase, { NAME as firebaseName } from './ducks/firebase';
import authentication, { NAME as authenicationName } from './ducks/authentication';

/**
 * Create combined reducer
 */
export default combineReducers({
  [firebaseName]: firebase,
  [authenicationName]: authentication,
  routing,
});
