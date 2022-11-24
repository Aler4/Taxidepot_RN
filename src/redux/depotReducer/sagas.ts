import { TCar, TDriver } from "./types";
import { loadCars, REQUEST_CARS, REQUEST_DRIVERS, updateLoad, uploadDrivers } from "./action";
import {getApi} from '../../services/getApi';
import {put, call, takeLatest} from '@redux-saga/core/effects';

export function* watchRequests() {
  yield takeLatest(REQUEST_DRIVERS, getDrivers);
  yield takeLatest(REQUEST_CARS, getCars);
}


function* getDrivers() {
  try {
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

function* getCars() {
  try {
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
};
