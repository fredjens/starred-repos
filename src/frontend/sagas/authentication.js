import { call, put, fork, take, cancel, all } from 'redux-saga/effects';
import { safePromise } from 'unexceptional';
import firebase from 'firebase';
import { startFirebase } from '../services/firebase';
import { addUserToDatabase } from '../ducks/firebase';
import config from '../config';
import store from '../store';

/**
 * Actions
 */

import {
  AUTHENICATION_CHECK,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGOUT,
  loginRequest,
  loginError,
  loginSuccess,
  logout,
} from '../ducks/authentication';

/**
 * Firebase authentication provider
 */

firebase.initializeApp(config);
const provider = new firebase.auth.GithubAuthProvider();

/**
 * Sagas
 */
function* authorize() {
  const [err, user] = yield call(firebase.auth().signInWithRedirect(provider));

  if (err || !user) {
    console.log('ERR', err);
    yield put(loginError());
  }

  yield put(loginSuccess(user));
  yield call(startFirebase, user.uid, firebase);
  return user;
}

function* loginFlow() {
  while (true) {
    yield take(LOGIN_REQUEST);
    const task = yield fork(authorize);

    const action = yield take([LOGOUT, LOGIN_ERROR]);
    yield cancel(task);
  }
}

function* authFlow() {
  while (true) {
    yield take(AUTHENICATION_CHECK);

    yield all(firebase.auth().onAuthStateChanged(user => {
      if (user) {
        startFirebase(user.uid, firebase);
        return store.dispatch(loginSuccess(user));
      }

      return store.dispatch(loginRequest());
    }));
  }
}

/**
 * Main saga that kicks everything off
 */
export default function* rootSaga() {
  yield all([
    call(authFlow),
    call(loginFlow),
  ]);
}
