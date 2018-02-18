import { call, put, fork, take, cancel, all } from 'redux-saga/effects';
import { safePromise } from 'unexceptional';

/**
 * Actions
 */

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT,
  loginRequest, loginError, loginSuccess, logout,
} from '../ducks/authentication';


let Api = {};

/**
 * Sagas
 */

function* authorize(user, password) {
  const [err, token] = yield call(
    safePromise(Api.authorize),
    user,
    password,
  );

  if (err) {
    yield put(loginError());
  }

  yield put(loginSuccess());
  yield call(Api.storeItem, {token})
}

function* loginFlow() {
  while (true) {
    const { user, password } = yield take(LOGIN_REQUEST);
    const task = yield fork(authorize, user, password);

    const action = yield take([LOGOUT, LOGIN_ERROR]);
    yield cancel(task);
    yield call(Api.clearItem, 'token');
  }
}

/**
 * Main saga that kicks everything off
 */
export default function* rootSaga() {
  yield all([
    call(authorize),
    call(loginFlow),
  ]);
}
