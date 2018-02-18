import firebase from 'firebase';
import { flow } from 'lodash';

/**
 * Feature name
 */
export const NAME = '@@firebase';

/**
 * Action types
 */
export const INITIAL_DATA = `${NAME}/INITIAL_DATA`;

/**
* Initial state
*/
const initialState = {};

/**
 * Selectors
 */
export const getState = (state) => state[NAME];
export const getUsername = flow(getState, state => state.github);
export const getName = flow(getState, (state) => state.name);
export const getCategories = flow(getState, (state) => state.categories);

/**
 * Generic firebase update action use by the Store
 */
export const updateFirebase = (collection) => {
  return {
    type: INITIAL_DATA,
    payload: {
      collection,
    },
  }
}

/**
 * Reducer
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INITIAL_DATA:
      return {
        ...state,
        ...action.payload.collection,
      };
    default:
      return state;
  }
};
