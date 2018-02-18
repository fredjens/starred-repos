import firebase from 'firebase';
import { flow } from 'lodash';

/**
 * Feature name
 */
export const NAME = '@@firebase';

/**
 * Action types
 */
export const UPDATE = 'UPDATE';

/**
 * Commands
 */
const writeToFirebase = (collection, reducer) => {
  console.log('write to firebase');
  firebase.database().ref(collection).transaction(reducer);
}

/**
* Initial state
*/
const initialState = {};

/**
 * Selectors
 */
export const getState = (state) => state[NAME];
export const getUsername = flow(getState, (state) => state.github);
export const getName = flow(getState, (state) => state.name);
export const getCategories = flow(getState, (state) => state.categories);

/**
 * Generic firebase update action use by the Store
 */
export const updateFirebase = (collection) => {
  return {
    type: UPDATE,
    collection,
  }
}

/**
 * Reducer
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.collection,
      };
    default:
      return state;
  }
};
