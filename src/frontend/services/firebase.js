import firebase from 'firebase';
import config from '../config';
import store from '../store';
import { updateFirebase } from '../ducks/firebase';

/**
 * Firebase authentication provider
 */

firebase.initializeApp(config);
export const provider = new firebase.auth.GithubAuthProvider();
export const authenticate = firebase.auth;
export const database = firebase.database();

/**
 * Database functions
 */

export function startFirebase(ref) {
  return database.ref(ref).on('value', (snapshot) => {
    const collection = snapshot.val();
    store.dispatch(updateFirebase(collection));
  });
}

export function writeToFirebase(collection, reducer) {
  return database().ref(collection).transaction(reducer);
}