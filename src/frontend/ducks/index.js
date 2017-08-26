import firebase from 'firebase';

const initialState = {};

/**
 * Commands
 */

const UPDATE = 'UPDATE';

/**
 * Commands
 */

const writeToFirebase = (collection, reducer) => {
  console.log('write to firebase');
  firebase.database().ref(collection).transaction(reducer);
}

/**
 * Actions
 */

export const addUserToDatabase = (payload) => {
  const {
    user: {
      uid,
      displayName,
    } = {},
    additionalUserInfo: {
      username = '',
    } = {},
   } = payload;

   console.log('adding a new database for user ', uid, username);

  return (dispatch) => {
    return writeToFirebase('/', (database) => ({
      ...database,
      [uid]: {
        name: displayName,
        github: username,
      }
    }));
  };
};

/**
 * Selectors
 */


/**
 * Generic firebase update action use by the Store
 */

export const updateFirebase = (collection) => {
  console.log('update collections');
  return {
    type: UPDATE,
    collection,
  }
}

/**
 * Reducer
 */

const collections = (state = initialState, action) => {
  console.log('firebase reducer', action);
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

export default collections;
