import {TAddAction, TCar, TDriver, TStatus} from './types';
import {
  ADD_CAR,
  ADD_DRIVER,
  getCarStatuses,
  getDriverStatuses,
  loadCars,
  REQUEST_CARS,
  REQUEST_DRIVERS,
  updateLoad,
  uploadDrivers,
} from './action';
import {addToApi, getApi} from '../../services/api';
import {put, call, takeLatest} from '@redux-saga/core/effects';

export function* watchRequests() {
  yield takeLatest(REQUEST_CARS, getCars);
  yield takeLatest(REQUEST_DRIVERS, getDrivers);
}
export function* watchaAdding() {
  yield takeLatest(ADD_DRIVER, addDriver);
  yield takeLatest(ADD_CAR, addCar);
}

function* getDrivers() {
  try {
    yield put(updateLoad(true));
    const drivers: TDriver[] = yield call(() =>
      getApi('driver')
        .then(response => response.json())
        .then(response => response.data),
    );
    const statuses: TStatus[] = yield call(() =>
      getApi('driver-status')
        .then(res => res.json())
        .then(res => res.data),
    );
    yield put(getDriverStatuses(statuses));
    yield put(uploadDrivers(drivers));
    yield put(updateLoad(false));
  } catch (e) {
    console.log(e);
  }
}

function* getCars() {
  try {
    yield put(updateLoad(true));
    const cars: TCar[] = yield call(() =>
      getApi('car')
        .then(response => response.json())
        .then(response => response.data),
    );
    const statuses: TStatus[] = yield call(() =>
      getApi('car-status')
        .then(res => res.json())
        .then(res => res.data),
    );
    yield put(getCarStatuses(statuses));
    yield put(loadCars(cars));
    yield put(updateLoad(false));
  } catch (e) {
    console.log(e);
  }
}

function* addDriver(arg: TAddAction) {
  try {
    yield addToApi('driver', 'post', arg.body).then(res => console.log(res));
    yield put(updateLoad(true));
    const drivers: TDriver[] = yield call(() =>
      getApi('driver')
        .then(response => response.json())
        .then(response => response.data),
    );
    yield put(uploadDrivers(drivers));
    yield put(updateLoad(false));
  } catch (e) {
    console.log(e);
  }
}

function* addCar(arg: TAddAction) {
  try {
    console.log(arg.body)
    yield addToApi('car', 'post', arg.body).then(res => console.log(res));
    yield put(updateLoad(true));
    const cars: TCar[] = yield call(() =>
      getApi('car')
        .then(response => response.json())
        .then(response => response.data),
    );
    yield put(loadCars(cars));
    yield put(updateLoad(false));
  } catch (e) {
    console.log(e);
  }
}
