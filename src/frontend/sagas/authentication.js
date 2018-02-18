import { call, put, fork, take, cancel, all } from 'redux-saga/effects';
import { safePromise } from 'unexceptional';
import { startFirebase, authenticate, provider } from '../services/firebase';
import { addUserToDatabase } from '../ducks/firebase';
import store from '../store';

/**
 * Actions
 */

import {
  AUTHENICATION_CHECK,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  loginRequest,
  loginError,
  loginSuccess,
  logout,
} from '../ducks/authentication';

import {
  loadRepos,
} from '../ducks/github';

import { 
  INITIAL_DATA,
} from '../ducks/firebase';

/**
 * Sagas
 */


function* success() {
  while (true) {
    const user = yield take(LOGIN_SUCCESS);
    yield call(startFirebase, user.payload.user.uid);
    yield take(INITIAL_DATA);
    yield put(loadRepos());
  }
}

function* authorize() {
  const [err, user] = yield call(authenticate().signInWithRedirect(provider));

  if (err || !user) {
    console.log('ERR', err);
    yield put(loginError());
  }

  yield put(loginSuccess(user));
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

    yield all(authenticate().onAuthStateChanged(user => {
      if (user) {
        return store.dispatch(loginSuccess(user));
      }

      return store.dispatch(loginRequest());
    }));
  }
}

/**
 * Main saga that kicks everything off
 */
export default function* authenticationSaga() {
  yield all([
    call(authFlow),
    call(loginFlow),
    call(success),
  ]);
}
