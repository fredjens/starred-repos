import { call, all } from 'redux-saga/effects';

import authenticationSaga from './authentication';
import initializationSaga from './initialization';

/**
 * Main saga that kicks everything off
 */
export default function* rootSaga() {
  yield all([
    call(authenticationSaga),
    call(initializationSaga),
  ]);
}