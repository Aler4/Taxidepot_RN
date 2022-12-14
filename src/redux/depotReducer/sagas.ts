import {TAddAction, TCar, TDriver, TStatus} from '../types';
import {
  ADD_CAR,
  ADD_DRIVER,
  DELETE_CAR,
  DELETE_DRIVER,
  getCarStatuses,
  getDriverStatuses,
  loadCars,
  REQUEST_CARS,
  REQUEST_DRIVERS,
  UPDATE_DRIVER,
  updateLoad,
  uploadDrivers,
} from './action';
import {addToApi, deleteFromApi, getApi} from '../../services/api';
import {put, call, takeLatest} from '@redux-saga/core/effects';
import {mergeProp} from '../../helpers/mergeProp';

export function* watchRequests() {
  yield takeLatest(REQUEST_CARS, getCars);
  yield takeLatest(REQUEST_DRIVERS, getDrivers);
}
export function* watchAdding() {
  yield takeLatest(ADD_DRIVER, addDriver);
  yield takeLatest(ADD_CAR, addCar);
}
export function* watchDeleting() {
  yield takeLatest(DELETE_DRIVER, deleteDriver);
  yield takeLatest(DELETE_CAR, deleteCar);
}
export function* watchUpdate() {
  yield takeLatest(UPDATE_DRIVER, updateDriverCard);
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
    console.log(drivers)
    yield put(getDriverStatuses(statuses));
    yield put(uploadDrivers(drivers));
    yield put(updateLoad(false));
  } catch (e) {
    console.log(e);
  }
}

function* getCars() {
  try {
    console.log('dsad');
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
    const drivers: TDriver[] = yield call(() =>
      getApi('driver')
        .then(response => response.json())
        .then(response => response.data),
    );

    yield put(getCarStatuses(statuses));
    yield put(loadCars(mergeProp(cars, drivers)));
    yield put(updateLoad(false));
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

function* addCar(arg: TAddAction) {
  try {
    yield addToApi('car', 'post', arg.body);
    yield getDrivers();
    yield getCars();
  } catch (e) {
    console.log(e);
  }
}

function* deleteCar(arg: TAddAction) {
  try {
    yield deleteFromApi('car', arg.id);
    yield getCars();
  } catch (e) {
    console.log(e);
  }
}
function* deleteDriver(arg: TAddAction) {
  try {
    yield deleteFromApi('driver', arg.id);
    yield getDrivers();
    yield getCars();
  } catch (e) {
    console.log(e);
  }
}

function* updateDriverCard(arg: TAddAction) {
  try {
    console.log(arg.body)
    yield call(() =>
      addToApi('driver', 'put', arg.body, arg.id).then(res => console.log(res)),
    );
    yield call(() => getDrivers());
  } catch (e) {
    console.log(e);
  }
}
