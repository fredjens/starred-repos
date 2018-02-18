import { call, put, take, all, select } from 'redux-saga/effects';
import { safeFunction } from 'unexceptional';
import store from '../store';
import { getStaredRepos } from '../services/github';

/**
 * Actions
 */

import {
  GET_REPOS,
  updateRepos,
} from '../ducks/github';

import { getUsername } from '../ducks/firebase';

/**
 * Sagas
 */

function* dataFlow() {
  while (true) {
    yield take(GET_REPOS);
    const user = yield select(getUsername);

    if (!user) {
      return;
    }

    const [err, repos] = yield call(safeFunction(getStaredRepos), user);

    if (err) {
      console.log('error', err);
      return;
    }

    yield put(updateRepos(repos));
  }
}

/**
 * Main saga that kicks everything off
 */
export default function* initalizationSaga() {
  yield all([
    call(dataFlow),
  ]);
}
