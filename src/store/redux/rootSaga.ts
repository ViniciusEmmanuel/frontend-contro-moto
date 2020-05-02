import { all } from 'redux-saga/effects';

import logon from './logon/saga';
import home from './Home/saga';
import listMaintenance from './ListMaintenance/saga';
import listGasoline from './ListGasoline/saga';

export default function* rootSaga() {
  return yield all([home, logon, listMaintenance, listGasoline]);
}
