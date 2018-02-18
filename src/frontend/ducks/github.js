import firebase from 'firebase';
import { flow } from 'lodash';

/**
 * Feature name
 */
export const NAME = '@@github';

/**
 * Action types
 */
export const UPDATE = `${NAME}/UPDATE`;
export const GET_REPOS = `${NAME}/GET_REPOS`;

/**
* Initial state
*/
const initialState = {
  loading: true,
  repos: [],
};

/**
 * Selectors
 */
export const getState = (state) => state[NAME];
export const getRepos = flow(getState, state => state.repos);
export const getLoading = flow(getState, state => state.loading);

/**
 * Generic firebase update action use by the Store
 */
export const loadRepos = () => {
  return { type: GET_REPOS };
}

export const updateRepos = (repos) => {
  return {
    type: UPDATE,
    payload: {
      repos,
    },
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
        loading: false,
        repos: [
          ...action.payload.repos,
        ],
      };
    default:
      return state;
  }
};
