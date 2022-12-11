import {TAddAction, TDriver, TStatus} from '../types';
import {
  ADD_DRIVER,
  DELETE_DRIVER,
  getDriverStatuses,
  REQUEST_DRIVERS,
  UPDATE_DRIVER,
  updateDriversLoad,
  uploadDrivers,
} from '../actions';
import {addToApi, deleteFromApi, getApi} from '../../services/api';
import {put, call, takeLatest} from '@redux-saga/core/effects';

export function* watchDrivers() {
  yield takeLatest(REQUEST_DRIVERS, getDrivers);
  yield takeLatest(ADD_DRIVER, addDriver);
  yield takeLatest(DELETE_DRIVER, deleteDriver);
  yield takeLatest(UPDATE_DRIVER, updateDriverCard);
}
function* getDrivers() {
  try {
    yield put(updateDriversLoad(true));
    const drivers: TDriver[] = yield call(() => getApi('driver'));
    const statuses: TStatus[] = yield call(() => getApi('driver-status'));
    yield put(getDriverStatuses(statuses));
    yield put(uploadDrivers(drivers));
    yield put(updateDriversLoad(false));
  } catch (e) {
    console.log(e);
  }
}
function* addDriver(arg: TAddAction) {
  try {
    yield addToApi('driver', 'post', arg.body).then(res => console.log(res));
    yield getDrivers();
  } catch (e) {
    console.log(e);
  }
}
function* deleteDriver(arg: TAddAction) {
  try {
    yield deleteFromApi('driver', arg.id);
    yield getDrivers();
  } catch (e) {
    console.log(e);
  }
}

function* updateDriverCard(arg: TAddAction) {
  try {
    console.log(arg.body);
    yield call(() => addToApi('driver', 'put', arg.body, arg.id));
  } catch (e) {
    console.log(e);
  }
}
